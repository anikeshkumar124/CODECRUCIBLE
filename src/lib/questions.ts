
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
      cpp: `#include <vector>
#include <unordered_map>

std::vector<int> twoSum(std::vector<int>& nums, int target) {
  std::unordered_map<int, int> num_map;
  for (int i = 0; i < nums.size(); ++i) {
    int complement = target - nums[i];
    if (num_map.count(complement)) {
      return {num_map[complement], i};
    }
    num_map[nums[i]] = i;
  }
  return {}; // Should not be reached given problem constraints
};`,
    },
    driverCode: {
        javascript: `{{{code}}}
const [nums, target] = JSON.parse('{{{input}}}');
const result = twoSum(nums, target);
console.log(JSON.stringify(result.sort((a, b) => a - b)));`,
        python: `
import sys
import json

{{{code}}}

raw_input = json.loads('{{{input}}}')
nums, target = raw_input
result = two_sum(nums, target)
result.sort()
print(json.dumps(result))`,
        cpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
#include <iterator>
#include <stdexcept>

// Forward declaration of the user's function
std::vector<int> twoSum(std::vector<int>& nums, int target);

{{{code}}}

void printVector(const std::vector<int>& vec) {
    std::cout << "[";
    for (size_t i = 0; i < vec.size(); ++i) {
        std::cout << vec[i];
        if (i < vec.size() - 1) {
            std::cout << ",";
        }
    }
    std::cout << "]";
}

// Validation function
void validateAndPrint(const std::vector<int>& nums, int target, const std::vector<int>& result) {
    if (result.size() != 2) {
        std::cout << "FAIL: Expected a vector with 2 indices, but got " << result.size() << ".";
        return;
    }

    int i1 = result[0];
    int i2 = result[1];

    if (i1 == i2) {
        std::cout << "FAIL: Indices must be distinct, but got two of the same: " << i1 << ".";
        return;
    }
    
    if (i1 < 0 || i1 >= nums.size() || i2 < 0 || i2 >= nums.size()) {
        std::cout << "FAIL: Indices are out of bounds. Got " << i1 << " and " << i2 << ", but array size is " << nums.size() << ".";
        return;
    }
    
    if (nums[i1] + nums[i2] != target) {
        std::cout << "FAIL: The sum of elements at indices " << i1 << " and " << i2 << " (" << nums[i1] << " + " << nums[i2] << " = " << nums[i1] + nums[i2] << ") does not equal the target (" << target << ").";
        return;
    }

    // If all checks pass, print the sorted result
    std::vector<int> sorted_result = result;
    std::sort(sorted_result.begin(), sorted_result.end());
    printVector(sorted_result);
}

int main() {
    std::string line = R"({{{input}}})";
    // This is a simplified parser for "[[num,num,...],target]"
    std::string clean_line;
    for (char c : line) {
        if (c != '[' && c != ']') {
            clean_line += c;
        }
    }
    std::replace(clean_line.begin(), clean_line.end(), ',', ' ');
    
    std::stringstream ss(clean_line);
    
    std::vector<int> all_numbers;
    int num;
    while(ss >> num) {
        all_numbers.push_back(num);
    }
    
    if (all_numbers.empty()) {
        std::cerr << "Error: Input is empty or invalid.";
        return 1;
    }

    int target = all_numbers.back();
    all_numbers.pop_back();
    std::vector<int> nums = all_numbers;
    
    try {
        std::vector<int> result = twoSum(nums, target);
        validateAndPrint(nums, target, result);
    } catch (const std::exception& e) {
        std::cout << "FAIL: An exception occurred during execution: " << e.what();
    } catch (...) {
        std::cout << "FAIL: An unknown exception occurred during execution.";
    }
    
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
      javascript: `function isValid(s) {
  // Your code here
};`,
      python: `def is_valid(s):
  # Your code here
  pass`,
      cpp: `#include <string>
#include <stack>

bool isValid(std::string s) {
  // Your code here
}`,
    },
    driverCode: {
        javascript: `{{{code}}}
const result = isValid({{{input}}});
console.log(JSON.stringify(result));`,
        python: `{{{code}}}
result = is_valid({{{input}}})
print(str(result).lower())`,
        cpp: `#include <iostream>
#include <string>
#include <vector>
#include <stack>

{{{code}}}

int main() {
    std::string s = {{{input}}};
    if (isValid(s)) {
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
