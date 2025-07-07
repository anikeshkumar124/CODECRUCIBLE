
export type Language = 'javascript' | 'python' | 'cpp';

export interface TestCase {
  id: number;
  input: string;
  expectedOutput: string;
  hidden: boolean;
  name: string;
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
      javascript: `function twoSum(nums, target) {
  // Your code here
};`,
      python: `def two_sum(nums, target):
  # Your code here
  pass`,
      cpp: `vector<int> twoSum(vector<int>& nums, int target) {
  // Your code here
}`,
    },
    driverCode: {
        javascript: `
function twoSum(nums, target) {
{{{code}}}
}
const result = twoSum({{{input}}});
console.log(JSON.stringify(result));`,
        python: `
import sys
import json

def two_sum(nums, target):
{{{code}}}

raw_input = json.loads("""{{{input}}}""")
nums, target = raw_input
result = two_sum(nums, target)
print(json.dumps(result))`,
        cpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>

{{{code}}}

// Dummy main to wrap user code, this will be more complex in a real scenario
int main() {
    // This part is tricky to generalize for C++ without a proper test harness.
    // We'll simulate it for now. This driver assumes a very specific input format.
    // For a real platform, this would be handled by a dedicated backend service.
    std::cout << "C++ execution harness not implemented in this prototype." << std::endl;
    return 0;
}`,
    },
    testCases: [
        { id: 1, name: 'Sample Case 1', input: '[[2,7,11,15], 9]', expectedOutput: '[0,1]', hidden: false },
        { id: 2, name: 'Sample Case 2', input: '[[3,2,4], 6]', expectedOutput: '[1,2]', hidden: false },
        { id: 3, name: 'Edge Case with Negatives', input: '[[-1,-2,-3,-4,-5], -8]', expectedOutput: '[2,4]', hidden: true },
        { id: 4, name: 'Large Numbers', input: '[[1000000000, 2, 7, 100], 1000000007]', expectedOutput: '[0,3]', hidden: true},
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
      javascript: `function isValid(s) {
  // Your code here
};`,
      python: `def is_valid(s):
  # Your code here
  pass`,
      cpp: `bool isValid(string s) {
  // Your code here
}`,
    },
    driverCode: {
        javascript: `
function isValid(s) {
{{{code}}}
}
const result = isValid({{{input}}});
console.log(JSON.stringify(result));`,
        python: `
import json
def is_valid(s: str) -> bool:
{{{code}}}

result = is_valid(json.loads('{{{input}}}'))
print(json.dumps(result))`,
        cpp: `#include <iostream>
#include <vector>
#include <string>

{{{code}}}

int main() {
    std::cout << "C++ execution harness not implemented in this prototype." << std::endl;
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
