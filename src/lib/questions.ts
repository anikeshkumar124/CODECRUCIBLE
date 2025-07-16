
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
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
};`,
      python: `from typing import List

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        numMap = {}
        n = len(nums)
        for i in range(n):
            complement = target - nums[i]
            if complement in numMap:
                return [numMap[complement], i]
            numMap[nums[i]] = i
        `,
      cpp: `#include <vector>
#include <unordered_map>
#include <algorithm>

class Solution {
public:
    std::vector<int> twoSum(std::vector<int>& nums, int target) {
        std::unordered_map<int, int> numMap;
        for (int i = 0; i < nums.size(); ++i) {
            int complement = target - nums[i];
            if (numMap.count(complement)) {
                return {numMap[complement], i};
            }
            numMap[nums[i]] = i;
        }
        return {};
    }
};`,
    },
    driverCode: {
        javascript: `{{{code}}}
const [nums, target] = JSON.parse(\`{{{input}}}\`);
const result = twoSum(nums, target);
console.log(JSON.stringify(result.sort((a, b) => a - b)));`,
        python: `import json
{{{code}}}
s = Solution()
nums, target = json.loads(\`{{{input}}}\`)
result = s.twoSum(nums, target)
result.sort()
print(json.dumps(result))`,
        cpp: `#include <iostream>
#include <vector>
#include <string>
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
        { id: 1, name: 'Sample Case 1', input: '[[2,7,11,15],9]', expectedOutput: '[0,1]', hidden: false },
        { id: 2, name: 'Sample Case 2', input: '[[3,2,4],6]', expectedOutput: '[1,2]', hidden: false },
        { id: 3, name: 'Edge Case with Negatives', input: '[[-1,-2,-3,-4,-5],-8]', expectedOutput: '[2,4]', hidden: true },
        { id: 4, name: 'Large Numbers', input: '[[1000000000,2,7,100],1000000007]', expectedOutput: '[0,2]', hidden: true},
        { id: 5, name: 'Zeroes', input: '[[0,4,3,0],0]', expectedOutput: '[0,3]', hidden: true },
    ]
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    shortDescription: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
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
const input_str = JSON.parse(\`{{{input}}}\`);
const result = isValid(input_str);
console.log(JSON.stringify(result));`,
        python: `import json
{{{code}}}
s = Solution()
input_str = json.loads(\`{{{input}}}\`)
result = s.isValid(input_str)
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
  },
  {
    id: 'reverse-string',
    title: 'Reverse String',
    difficulty: 'Easy',
    shortDescription: 'Write a function that reverses a string. The input string is given as an array of characters.',
    description: `
Write a function that reverses a string. The input string is given as an array of characters \`s\`.

You must do this by modifying the input array **in-place** with O(1) extra memory.

**Example 1:**
<pre>
<strong>Input:</strong> s = ["h","e","l","l","o"]
<strong>Output:</strong> ["o","l","l","e","h"]
</pre>

**Example 2:**
<pre>
<strong>Input:</strong> s = ["H","a","n","n","a","h"]
<strong>Output:</strong> ["h","a","n","n","a","H"]
</pre>
    `,
    boilerplate: {
      javascript: `/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
    
};`,
      python: `from typing import List

class Solution:
    def reverseString(self, s: List[str]) -> None:
        """
        Do not return anything, modify s in-place instead.
        """
        `,
      cpp: `#include <vector>

class Solution {
public:
    void reverseString(std::vector<char>& s) {
        
    }
};`,
    },
    driverCode: {
        javascript: `{{{code}}}
const s = JSON.parse(\`{{{input}}}\`);
reverseString(s);
console.log(JSON.stringify(s));`,
        python: `import json
{{{code}}}
s_instance = Solution()
s_input = json.loads(\`{{{input}}}\`)
s_instance.reverseString(s_input)
print(json.dumps(s_input))`,
        cpp: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

{{{code}}}

// Helper to convert JSON-like string array to vector<char>
std::vector<char> stringToCharVector(const std::string& str) {
    std::vector<char> result;
    for (char c : str) {
        if (c != '[' && c != ']' && c != ',' && c != '"' && c != ' ') {
            result.push_back(c);
        }
    }
    return result;
}

int main() {
    std::string str_input = {{{input_string}}};
    std::vector<char> s = stringToCharVector(str_input);
    Solution sol;
    sol.reverseString(s);
    std::cout << "[";
    for (size_t i = 0; i < s.size(); ++i) {
        std::cout << "\\"" << s[i] << "\\"";
        if (i < s.size() - 1) {
            std::cout << ",";
        }
    }
    std::cout << "]";
    return 0;
}`,
    },
    testCases: [
        { id: 1, name: 'Sample Case 1', input: '["h","e","l","l","o"]', expectedOutput: '["o","l","l","e","h"]', hidden: false },
        { id: 2, name: 'Sample Case 2', input: '["H","a","n","n","a","h"]', expectedOutput: '["h","a","n","n","a","H"]', hidden: false },
        { id: 3, name: 'Single Character', input: '["a"]', expectedOutput: '["a"]', hidden: true },
        { id: 4, name: 'Empty String', input: '[]', expectedOutput: '[]', hidden: true },
        { id: 5, name: 'Long String', input: '["A"," ","m","a","n",","," ","a"," ","p","l","a","n",","," ","a"," ","c","a","n","a","l",":"," ","P","a","n","a","m","a"]', expectedOutput: '["a","m","a","n","a","P"," ",":","l","a","n","a","c"," ","a"," ",",","n","a","l","p"," ","a"," ",",","n","a","m"," ","A"]', hidden: true },
    ]
  },
  {
    id: 'merge-two-sorted-lists',
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    shortDescription: 'Merge two sorted linked lists and return it as a new sorted list.',
    description: `
You are given the heads of two sorted linked lists \`list1\` and \`list2\`.

Merge the two lists into one **sorted** list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

**Example 1:**
<pre>
<strong>Input:</strong> list1 = [1,2,4], list2 = [1,3,4]
<strong>Output:</strong> [1,1,2,3,4,4]
</pre>

**Example 2:**
<pre>
<strong>Input:</strong> list1 = [], list2 = [0]
<strong>Output:</strong> [0]
</pre>
    `,
    boilerplate: {
      javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    
};`,
      python: `from typing import Optional

# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        `,
      cpp: `// Definition for singly-linked list.
struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};

class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        
    }
};`,
    },
    driverCode: {
        javascript: `function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
function arrayToList(arr) {
    if (!arr || arr.length === 0) return null;
    let head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}
function listToArray(list) {
    const result = [];
    let current = list;
    while(current) {
        result.push(current.val);
        current = current.next;
    }
    return result;
}
{{{code}}}
const [arr1, arr2] = JSON.parse(\`{{{input}}}\`);
const l1 = arrayToList(arr1);
const l2 = arrayToList(arr2);
const result = mergeTwoLists(l1, l2);
console.log(JSON.stringify(listToArray(result)));`,
        python: `import json
from typing import Optional

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def array_to_list(arr):
    if not arr:
        return None
    head = ListNode(arr[0])
    current = head
    for i in range(1, len(arr)):
        current.next = ListNode(arr[i])
        current = current.next
    return head

def list_to_array(head):
    arr = []
    current = head
    while current:
        arr.append(current.val)
        current = current.next
    return arr

{{{code}}}

s = Solution()
arr1, arr2 = json.loads(\`{{{input}}}\`)
l1 = array_to_list(arr1)
l2 = array_to_list(arr2)
result = s.mergeTwoLists(l1, l2)
print(json.dumps(list_to_array(result)))`,
        cpp: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

{{{code}}}

ListNode* arrayToList(const std::vector<int>& arr) {
    if (arr.empty()) return nullptr;
    ListNode* head = new ListNode(arr[0]);
    ListNode* current = head;
    for (size_t i = 1; i < arr.size(); ++i) {
        current->next = new ListNode(arr[i]);
        current = current->next;
    }
    return head;
}

std::vector<int> listToArray(ListNode* head) {
    std::vector<int> arr;
    ListNode* current = head;
    while(current) {
        arr.push_back(current->val);
        current = current->next;
    }
    return arr;
}

void printVector(const std::vector<int>& vec) {
    std::cout << "[";
    for(size_t i = 0; i < vec.size(); ++i) {
        std::cout << vec[i];
        if (i < vec.size() - 1) std::cout << ",";
    }
    std::cout << "]";
}

int main() {
    std::vector<int> arr1 = {{{list1}}};
    std::vector<int> arr2 = {{{list2}}};
    ListNode* l1 = arrayToList(arr1);
    ListNode* l2 = arrayToList(arr2);
    Solution sol;
    ListNode* result = sol.mergeTwoLists(l1, l2);
    printVector(listToArray(result));
    return 0;
}`,
    },
    testCases: [
        { id: 1, name: 'Sample Case 1', input: '[[1,2,4],[1,3,4]]', expectedOutput: '[1,1,2,3,4,4]', hidden: false },
        { id: 2, name: 'Empty Lists', input: '[[],[]]', expectedOutput: '[]', hidden: false },
        { id: 3, name: 'One Empty List', input: '[[],[0]]', expectedOutput: '[0]', hidden: false },
        { id: 4, name: 'Identical Lists', input: '[[5,6],[5,6]]', expectedOutput: '[5,5,6,6]', hidden: true },
        { id: 5, name: 'No Overlap', input: '[[1,2,3],[4,5,6]]', expectedOutput: '[1,2,3,4,5,6]', hidden: true },
    ]
  },
  {
    id: 'max-subarray',
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    shortDescription: 'Find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.',
    description: `
Given an integer array \`nums\`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

A **subarray** is a contiguous part of an array.

**Example 1:**
<pre>
<strong>Input:</strong> nums = [-2,1,-3,4,-1,2,1,-5,4]
<strong>Output:</strong> 6
<strong>Explanation:</strong> The subarray [4,-1,2,1] has the largest sum 6.
</pre>

**Example 2:**
<pre>
<strong>Input:</strong> nums = [5,4,-1,7,8]
<strong>Output:</strong> 23
<strong>Explanation:</strong> The subarray [5,4,-1,7,8] has the largest sum 23.
</pre>
    `,
    boilerplate: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    
};`,
      python: `from typing import List

class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        `,
      cpp: `#include <vector>
#include <algorithm>

class Solution {
public:
    int maxSubArray(std::vector<int>& nums) {
        
    }
};`,
    },
    driverCode: {
        javascript: `{{{code}}}
const nums = JSON.parse(\`{{{input}}}\`);
const result = maxSubArray(nums);
console.log(JSON.stringify(result));`,
        python: `import json
{{{code}}}
s = Solution()
nums = json.loads(\`{{{input}}}\`)
result = s.maxSubArray(nums)
print(json.dumps(result))`,
        cpp: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <numeric>

{{{code}}}

int main() {
    std::vector<int> nums = {{{input_vector}}};
    Solution sol;
    int result = sol.maxSubArray(nums);
    std::cout << result;
    return 0;
}`,
    },
    testCases: [
        { id: 1, name: 'Sample Case 1', input: '[-2,1,-3,4,-1,2,1,-5,4]', expectedOutput: '6', hidden: false },
        { id: 2, name: 'All Positives', input: '[5,4,-1,7,8]', expectedOutput: '23', hidden: false },
        { id: 3, name: 'All Negatives', input: '[-5,-1,-3]', expectedOutput: '-1', hidden: true },
        { id: 4, name: 'Single Element', input: '[1]', expectedOutput: '1', hidden: true },
        { id: 5, name: 'Complex Case', input: '[3, -2, 5, -1]', expectedOutput: '6', hidden: true },
    ]
  },
  {
    id: 'buy-sell-stock',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    shortDescription: 'Find the maximum profit that can be achieved by buying a stock on one day and selling it on a future day.',
    description: `
You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i\`-th day.

You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return \`0\`.

**Example 1:**
<pre>
<strong>Input:</strong> prices = [7,1,5,3,6,4]
<strong>Output:</strong> 5
<strong>Explanation:</strong> Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
</pre>

**Example 2:**
<pre>
<strong>Input:</strong> prices = [7,6,4,3,1]
<strong>Output:</strong> 0
<strong>Explanation:</strong> In this case, no transactions are done and the max profit is 0.
</pre>
    `,
    boilerplate: {
      javascript: `/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    
};`,
      python: `from typing import List

class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        `,
      cpp: `#include <vector>
#include <algorithm>

class Solution {
public:
    int maxProfit(std::vector<int>& prices) {
        
    }
};`,
    },
    driverCode: {
        javascript: `{{{code}}}
const prices = JSON.parse(\`{{{input}}}\`);
const result = maxProfit(prices);
console.log(JSON.stringify(result));`,
        python: `import json
{{{code}}}
s = Solution()
prices = json.loads(\`{{{input}}}\`)
result = s.maxProfit(prices)
print(json.dumps(result))`,
        cpp: `#include <iostream>
#include <vector>
#include <algorithm>

{{{code}}}

int main() {
    std::vector<int> prices = {{{input_vector}}};
    Solution sol;
    int result = sol.maxProfit(prices);
    std::cout << result;
    return 0;
}`,
    },
    testCases: [
        { id: 1, name: 'Sample Case 1', input: '[7,1,5,3,6,4]', expectedOutput: '5', hidden: false },
        { id: 2, name: 'No Profit', input: '[7,6,4,3,1]', expectedOutput: '0', hidden: false },
        { id: 3, name: 'Single Day', input: '[1]', expectedOutput: '0', hidden: true },
        { id: 4, name: 'Increasing Prices', input: '[1,2,3,4,5]', expectedOutput: '4', hidden: true },
        { id: 5, name: 'Fluctuating Prices', input: '[2,4,1]', expectedOutput: '2', hidden: true },
    ]
  },
  {
    id: 'longest-substring-no-repeats',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    shortDescription: 'Given a string, find the length of the longest substring without repeating characters.',
    description: `
Given a string \`s\`, find the length of the **longest substring** without repeating characters.

**Example 1:**
<pre>
<strong>Input:</strong> s = "abcabcbb"
<strong>Output:</strong> 3
<strong>Explanation:</strong> The answer is "abc", with the length of 3.
</pre>

**Example 2:**
<pre>
<strong>Input:</strong> s = "bbbbb"
<strong>Output:</strong> 1
<strong>Explanation:</strong> The answer is "b", with the length of 1.
</pre>

**Example 3:**
<pre>
<strong>Input:</strong> s = "pwwkew"
<strong>Output:</strong> 3
<strong>Explanation:</strong> The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
</pre>
    `,
    boilerplate: {
      javascript: `/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    
};`,
      python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        `,
      cpp: `#include <string>
#include <unordered_map>
#include <algorithm>

class Solution {
public:
    int lengthOfLongestSubstring(std::string s) {
        
    }
};`,
    },
    driverCode: {
        javascript: `{{{code}}}
const s = JSON.parse(\`{{{input}}}\`);
const result = lengthOfLongestSubstring(s);
console.log(JSON.stringify(result));`,
        python: `import json
{{{code}}}
sol = Solution()
s = json.loads(\`{{{input}}}\`)
result = sol.lengthOfLongestSubstring(s)
print(json.dumps(result))`,
        cpp: `#include <iostream>
#include <string>
#include <unordered_map>
#include <algorithm>

{{{code}}}

int main() {
    std::string s_input = {{{input_string}}};
    Solution sol;
    int result = sol.lengthOfLongestSubstring(s_input);
    std::cout << result;
    return 0;
}`,
    },
    testCases: [
        { id: 1, name: 'Sample Case 1', input: '"abcabcbb"', expectedOutput: '3', hidden: false },
        { id: 2, name: 'All Same Characters', input: '"bbbbb"', expectedOutput: '1', hidden: false },
        { id: 3, name: 'Sample Case 3', input: '"pwwkew"', expectedOutput: '3', hidden: false },
        { id: 4, name: 'Empty String', input: '""', expectedOutput: '0', hidden: true },
        { id: 5, name: 'Substring at End', input: '"aab"', expectedOutput: '2', hidden: true },
    ]
  },
  {
    id: 'climbing-stairs',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    shortDescription: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    description: `
You are climbing a staircase. It takes \`n\` steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

**Example 1:**
<pre>
<strong>Input:</strong> n = 2
<strong>Output:</strong> 2
<strong>Explanation:</strong> There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps
</pre>

**Example 2:**
<pre>
<strong>Input:</strong> n = 3
<strong>Output:</strong> 3
<strong>Explanation:</strong> There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
</pre>
    `,
    boilerplate: {
      javascript: `/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    
};`,
      python: `class Solution:
    def climbStairs(self, n: int) -> int:
        `,
      cpp: `class Solution {
public:
    int climbStairs(int n) {
        
    }
};`,
    },
    driverCode: {
        javascript: `{{{code}}}
const n = JSON.parse(\`{{{input}}}\`);
const result = climbStairs(n);
console.log(JSON.stringify(result));`,
        python: `import json
{{{code}}}
sol = Solution()
n = json.loads(\`{{{input}}}\`)
result = sol.climbStairs(n)
print(json.dumps(result))`,
        cpp: `#include <iostream>

{{{code}}}

int main() {
    int n = {{{input_value}}};
    Solution sol;
    int result = sol.climbStairs(n);
    std::cout << result;
    return 0;
}`,
    },
    testCases: [
        { id: 1, name: 'Sample Case 1', input: '2', expectedOutput: '2', hidden: false },
        { id: 2, name: 'Sample Case 2', input: '3', expectedOutput: '3', hidden: false },
        { id: 3, name: 'One Step', input: '1', expectedOutput: '1', hidden: true },
        { id: 4, name: 'Larger Case', input: '5', expectedOutput: '8', hidden: true },
        { id: 5, name: 'Max Constraint', input: '45', expectedOutput: '1836311903', hidden: true },
    ]
  },
  {
    id: 'product-except-self',
    title: 'Product of Array Except Self',
    difficulty: 'Medium',
    shortDescription: 'Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].',
    description: `
Given an integer array \`nums\`, return an array \`answer\` such that \`answer[i]\` is equal to the product of all the elements of \`nums\` except \`nums[i]\`.

The product of any prefix or suffix of \`nums\` is **guaranteed** to fit in a **32-bit** integer.

You must write an algorithm that runs in \`O(n)\` time and without using the division operation.

**Example 1:**
<pre>
<strong>Input:</strong> nums = [1,2,3,4]
<strong>Output:</strong> [24,12,8,6]
</pre>

**Example 2:**
<pre>
<strong>Input:</strong> nums = [-1,1,0,-3,3]
<strong>Output:</strong> [0,0,9,0,0]
</pre>
    `,
    boilerplate: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    
};`,
      python: `from typing import List

class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        `,
      cpp: `#include <vector>

class Solution {
public:
    std::vector<int> productExceptSelf(std::vector<int>& nums) {
        
    }
};`,
    },
    driverCode: {
        javascript: `{{{code}}}
const nums = JSON.parse(\`{{{input}}}\`);
const result = productExceptSelf(nums);
console.log(JSON.stringify(result));`,
        python: `import json
{{{code}}}
sol = Solution()
nums = json.loads(\`{{{input}}}\`)
result = sol.productExceptSelf(nums)
print(json.dumps(result))`,
        cpp: `#include <iostream>
#include <vector>

{{{code}}}

void printVector(const std::vector<int>& vec) {
    std::cout << "[";
    for(size_t i = 0; i < vec.size(); ++i) {
        std::cout << vec[i];
        if (i < vec.size() - 1) std::cout << ",";
    }
    std::cout << "]";
}

int main() {
    std::vector<int> nums = {{{input_vector}}};
    Solution sol;
    std::vector<int> result = sol.productExceptSelf(nums);
    printVector(result);
    return 0;
}`,
    },
    testCases: [
        { id: 1, name: 'Sample Case 1', input: '[1,2,3,4]', expectedOutput: '[24,12,8,6]', hidden: false },
        { id: 2, name: 'Sample Case 2 with Zero', input: '[-1,1,0,-3,3]', expectedOutput: '[0,0,9,0,0]', hidden: false },
        { id: 3, name: 'All Ones', input: '[1,1,1,1]', expectedOutput: '[1,1,1,1]', hidden: true },
        { id: 4, name: 'Two Numbers', input: '[2,5]', expectedOutput: '[5,2]', hidden: true },
        { id: 5, name: 'With Multiple Zeros', input: '[0,0]', expectedOutput: '[0,0]', hidden: true },
    ]
  },
  {
    id: 'linked-list-cycle',
    title: 'Linked List Cycle',
    difficulty: 'Easy',
    shortDescription: 'Given head, the head of a linked list, determine if the linked list has a cycle in it.',
    description: `
Given \`head\`, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the \`next\` pointer. Internally, \`pos\` is used to denote the index of the node that tail's \`next\` pointer is connected to. **Note that \`pos\` is not passed as a parameter.**

Return \`true\` if there is a cycle in the linked list. Otherwise, return \`false\`.

**Example 1:**
<pre>
<img src="https://placehold.co/300x100.png" data-ai-hint="linked list cycle" alt="Linked list with a cycle">
<strong>Input:</strong> head = [3,2,0,-4], pos = 1
<strong>Output:</strong> true
<strong>Explanation:</strong> There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).
</pre>

**Example 2:**
<pre>
<img src="https://placehold.co/200x50.png" data-ai-hint="linked list cycle" alt="Linked list with a cycle">
<strong>Input:</strong> head = [1,2], pos = 0
<strong>Output:</strong> true
<strong>Explanation:</strong> There is a cycle in the linked list, where the tail connects to the 0th node.
</pre>

**Example 3:**
<pre>
<img src="https://placehold.co/100x50.png" data-ai-hint="linked list" alt="Linked list with no cycle">
<strong>Input:</strong> head = [1], pos = -1
<strong>Output:</strong> false
<strong>Explanation:</strong> There is no cycle in the linked list.
</pre>
    `,
    boilerplate: {
      javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    
};`,
      python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        `,
      cpp: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    bool hasCycle(ListNode *head) {
        
    }
};`,
    },
    driverCode: {
        javascript: `function ListNode(val) { this.val = val; this.next = null; }
function arrayToCycleList(arr, pos) {
    if (!arr || arr.length === 0) return null;
    let head = new ListNode(arr[0]);
    let current = head;
    let nodes = [head];
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
        nodes.push(current);
    }
    if (pos !== -1 && pos < arr.length) {
        current.next = nodes[pos];
    }
    return head;
}
{{{code}}}
const [arr, pos] = JSON.parse(\`{{{input}}}\`);
const head = arrayToCycleList(arr, pos);
const result = hasCycle(head);
console.log(JSON.stringify(result));`,
        python: `import json
from typing import Optional

class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

def array_to_cycle_list(arr, pos):
    if not arr:
        return None
    head = ListNode(arr[0])
    nodes = [head]
    current = head
    for i in range(1, len(arr)):
        current.next = ListNode(arr[i])
        current = current.next
        nodes.append(current)
    if pos != -1 and pos < len(arr):
        current.next = nodes[pos]
    return head
{{{code}}}
sol = Solution()
arr, pos = json.loads(\`{{{input}}}\`)
head = array_to_cycle_list(arr, pos)
result = sol.hasCycle(head)
print(str(result).lower())`,
        cpp: `#include <iostream>
#include <vector>

struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(NULL) {}
};

ListNode* arrayToCycleList(const std::vector<int>& arr, int pos) {
    if (arr.empty()) return nullptr;
    ListNode* head = new ListNode(arr[0]);
    std::vector<ListNode*> nodes;
    nodes.push_back(head);
    ListNode* current = head;
    for (size_t i = 1; i < arr.size(); ++i) {
        current->next = new ListNode(arr[i]);
        current = current->next;
        nodes.push_back(current);
    }
    if (pos != -1 && pos < arr.size()) {
        current->next = nodes[pos];
    }
    return head;
}
{{{code}}}
int main() {
    std::vector<int> arr = {{{input_vector}}};
    int pos = {{{input_pos}}};
    ListNode* head = arrayToCycleList(arr, pos);
    Solution sol;
    bool result = sol.hasCycle(head);
    std::cout << (result ? "true" : "false");
    // Clean up to prevent memory leak in non-cycle cases, though not strictly necessary for judge
    if (!result) {
      ListNode* curr = head;
      while(curr) {
        ListNode* temp = curr;
        curr = curr->next;
        delete temp;
      }
    }
    return 0;
}`,
    },
    testCases: [
        { id: 1, name: 'Sample Case 1', input: '[[3,2,0,-4], 1]', expectedOutput: 'true', hidden: false },
        { id: 2, name: 'Sample Case 2', input: '[[1,2], 0]', expectedOutput: 'true', hidden: false },
        { id: 3, name: 'No Cycle', input: '[[1], -1]', expectedOutput: 'false', hidden: false },
        { id: 4, name: 'Single Node Cycle', input: '[[1], 0]', expectedOutput: 'true', hidden: true },
        { id: 5, name: 'Empty List', input: '[[], -1]', expectedOutput: 'false', hidden: true },
    ]
  }
];
