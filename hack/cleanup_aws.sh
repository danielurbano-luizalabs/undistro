#!/usr/bin/env bash

# Copyright 2020-2021 The Undistro Authors.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

set -o nounset

# list of all the resources to be deleted in order

# get autoscaling group name for the given e2e test
function get_autoscaling_group_name() {
  local test_name=$1
  local asg_name=$(aws autoscaling describe-auto-scaling-groups \
    --query "AutoScalingGroups[?Tags[?Key=='Name'].Value=='${test_name}'].AutoScalingGroupName" \
    --output text)
  echo "${asg_name}"
}

# get the launch template name for the given e2e test
function get_launch_template_name() {
  local test_name=$1
  local launch_template_name=$(aws autoscaling describe-launch-templates \
    --query "LaunchTemplates[?Tags[?Key=='Name'].Value=='${test_name}'].LaunchTemplateName" \
    --output text)
  echo "${launch_template_name}"
}

# get instances for the given autoscaling group
function get_instances() {
  local asg_name=$1
  local instances=$(aws autoscaling describe-auto-scaling-groups \
    --auto-scaling-group-name "${asg_name}" \
    --query "AutoScalingGroups[0].Instances[].InstanceId" \
    --output text)
  echo "${instances}"
}

# get nat gateways for the given autoscaling group
function get_nat_gateways() {
  local asg_name=$1
  local nat_gateways=$(aws ec2 describe-nat-gateways \
    --filter "Name=tag:Name,Values=${asg_name}" \
    --query "NatGateways[].NatGatewayId" \
    --output text)
  echo "${nat_gateways}"
}

# get load balancer name for the given e2e test
function get_load_balancer_name() {
  local test_name=$1
  local load_balancer_name=$(aws elbv2 describe-load-balancers \
    --query "LoadBalancers[?Tags[?Key=='Name'].Value=='${test_name}'].LoadBalancerName" \
    --output text)
  echo "${load_balancer_name}"
}

# get vpc name for the given e2e test
function get_vpc_name() {
  local test_name=$1
  local vpc_name=$(aws ec2 describe-vpcs \
    --query "Vpcs[?Tags[?Key=='Name'].Value=='${test_name}'].VpcId" \
    --output text)
  echo "${vpc_name}"
}

# get ips for the given e2e test
function get_ips() {
  local test_name=$1
  local ips=$(aws ec2 describe-addresses \
    --query "Addresses[?Tags[?Key=='Name'].Value=='${test_name}'].AllocationId" \
    --output text)
  echo "${ips}"
}

# delete all the resources for the given e2e test
function delete_resources() {
  local test_name=$1
  local asg_name=$(get_autoscaling_group_name "${test_name}")
  local launch_template_name=$(get_launch_template_name "${test_name}")
  local instances=$(get_instances "${asg_name}")
  local nat_gateways=$(get_nat_gateways "${asg_name}")
  local load_balancer_name=$(get_load_balancer_name "${test_name}")
  local vpc_name=$(get_vpc_name "${test_name}")
  local ips=$(get_ips "${test_name}")

  # delete autoscaling group
  aws autoscaling delete-auto-scaling-group \
    --auto-scaling-group-name "${asg_name}" \
    --force-delete

  # delete launch template
  aws autoscaling delete-launch-template \
    --launch-template "${launch_template_name}"

  # delete instances
  aws ec2 terminate-instances \
    --instance-ids "${instances}"

  # delete nat gateways
  aws ec2 delete-nat-gateway \
    --nat-gateway-id "${nat_gateways}"

  # delete load balancer
  aws elbv2 delete-load-balancer \
    --load-balancer-arn "${load_balancer_name}"

  # delete vpc
  aws ec2 delete-vpc \
    --vpc-id "${vpc_name}"

  # delete ips
  aws ec2 release-address \
    --allocation-ids "${ips}"
}
