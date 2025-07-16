
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
input_data = json.loads(\`{{{input}}}\`)
result = s.twoSum(input_data[0], input_data[1])
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
const result = isValid(JSON.parse(\`{{{input}}}\`));
console.log(JSON.stringify(result));`,
        python: `import json
{{{code}}}
s = Solution()
result = s.isValid(json.loads(\`{{{input}}}\`))
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

int main() {
    std::string str_input = {{{input}}};
    std::vector<char> s(str_input.begin(), str_input.end());
    Solution sol;
    sol.reverseString(s);
    std::cout << "[";
    for (size_t i = 0; i < s.size(); ++i) {
        std::cout << "\"" << s[i] << "\"";
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
    std::vector<int> nums = {{{input}}};
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
  }
];
