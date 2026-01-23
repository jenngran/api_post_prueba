#!/usr/bin/env python3
import rclpy
from rclpy.node import Node
from nav2_msgs.action import NavigateToPose
from rclpy.action import ActionClient
from geometry_msgs.msg import PoseStamped

class NavExecutor(Node):
    def __init__(self):
        super().__init__('nav_executor_node')
        self.cli = ActionClient(self, NavigateToPose, '/navigate_to_pose')
        self.sub = self.create_subscription(PoseStamped, '/continual_goal', self.cb_goal, 10)
    def cb_goal(self, msg: PoseStamped):
        goal = NavigateToPose.Goal(); goal.pose = msg
        self.cli.wait_for_server(); self.cli.send_goal_async(goal)
        self.get_logger().info('[Nav2] goal enviado')

def main():
    rclpy.init(); node=NavExecutor(); rclpy.spin(node); rclpy.shutdown()

if __name__=='__main__':
    main()
