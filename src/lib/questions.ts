
export type Language = 'javascript' | 'python' | 'cpp';

export interface TestCase {
  id: number;
  name: string;
  input: string;
  expectedOutput: string;
  hidden: boolean;
}

export interface Question {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  shortDescription: string;
  boilerplate: Record<Language, string>;
  driverCode: Record<Language, string>;
  testCases: TestCase[];
}

export const questions: Question[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    shortDescription: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    description: `
Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.

**Example 1:**
<pre>
<strong>Input:</strong> nums = [2,7,11,15], target = 9
<strong>Output:</strong> [0,1]
<strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].
</pre>

**Example 2:**
<pre>
<strong>Input:</strong> nums = [3,2,4], target = 6
<strong>Output:</strong> [1,2]
</pre>
    `,
    boilerplate: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    
};`,
      python: `from typing import List

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        `,
      cpp: `#include <vector>
#include <unordered_map>

class Solution {
public:
    std::vector<int> twoSum(std::vector<int>& nums, int target) {
        std::unordered_map<int, int> num_to_index;
        for (int i = 0; i < nums.size(); ++i) {
            int complement = target - nums[i];
            if (num_to_index.count(complement)) {
                return {num_to_index[complement], i};
            }
            num_to_index[nums[i]] = i;
        }
        return {};
    }
};`,
    },
    driverCode: {
        javascript: `{{{code}}}
const parsedInput = JSON.parse({{{input}}});
const result = twoSum(parsedInput[0], parsedInput[1]);
console.log(JSON.stringify(result.sort((a, b) => a - b)));`,
        python: `import json
{{{code}}}
s = Solution()
result = s.twoSum(*json.loads({{{input}}}))
result.sort()
print(json.dumps(result))`,
        cpp: `#include <iostream>
#include <vector>
#include <algorithm>
#include <unordered_map>

{{{code}}}

int main() {
    std::vector<int> nums = {{{nums_vector}}};
    int target = {{{target_value}}};
    
    Solution s;
    std::vector<int> result = s.twoSum(nums, target);
    std::sort(result.begin(), result.end());
    
    std::cout << "[";
    for (size_t i = 0; i < result.size(); ++i) {
        std::cout << result[i];
        if (i < result.size() - 1) {
            std::cout << ",";
        }
    }
    std::cout << "]";
    
    return 0;
}`,
    },
    testCases: [
        { id: 1, name: 'Sample Case 1', input: '[[2,7,11,15], 9]', expectedOutput: '[0,1]', hidden: false },
        { id: 2, name: 'Sample Case 2', input: '[[3,2,4], 6]', expectedOutput: '[1,2]', hidden: false },
        { id: 3, name: 'Edge Case with Negatives', input: '[[-1,-2,-3,-4,-5], -8]', expectedOutput: '[2,4]', hidden: true },
        { id: 4, name: 'Large Numbers', input: '[[1000000000, 2, 7, 100], 1000000007]', expectedOutput: '[0,2]', hidden: true},
        { id: 5, name: 'Zeroes', input: '[[0,4,3,0], 0]', expectedOutput: '[0,3]', hidden: true },
    ]
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    shortDescription: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
    description: `
Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

**Example 1:**
<pre>
<strong>Input:</strong> s = "()"
<strong>Output:</strong> true
</pre>

**Example 2:**
<pre>
<strong>Input:</strong> s = "()[]{}"
<strong>Output:</strong> true
</pre>
    `,
    boilerplate: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    
};`,
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        `,
      cpp: `#include <string>
#include <stack>

class Solution {
public:
    bool isValid(std::string s) {
      // Your code here
    }
};`,
    },
    driverCode: {
        javascript: `{{{code}}}
const result = isValid(JSON.parse({{{input}}}));
console.log(JSON.stringify(result));`,
        python: `import json
{{{code}}}
s = Solution()
result = s.isValid(json.loads({{{input}}}))
print(str(result).lower())`,
        cpp: `#include <iostream>
#include <string>
#include <vector>
#include <stack>

{{{code}}}

int main() {
    std::string s_input = {{{input}}};
    Solution s;
    if (s.isValid(s_input)) {
        std::cout << "true";
    } else {
        std::cout << "false";
    }
    return 0;
}`,
    },
    testCases: [
        { id: 1, name: 'Sample 1', input: '"()"', expectedOutput: 'true', hidden: false },
        { id: 2, name: 'Sample 2', input: '"()[]{}"', expectedOutput: 'true', hidden: false },
        { id: 3, name: 'Invalid Case', input: '"(]"', expectedOutput: 'false', hidden: false },
        { id: 4, name: 'Mismatched', input: '"{[)]}"', expectedOutput: 'false', hidden: true },
        { id: 5, name: 'Only Open', input: '"("', expectedOutput: 'false', hidden: true },
    ]
  }
];
