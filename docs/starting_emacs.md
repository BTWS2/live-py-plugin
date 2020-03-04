---
title: Getting Started with Live Coding in Emacs
subtitle: Instantly Visualize Your Code
---
Live Coding in Python lets you run your Python code as you type it. For
example, this code prints a greeting to my friend, Alice.

    File Edit Options Buffers Tools Python Help                                     
    name = 'Alice'                         |name = 'Alice'
    print('Hello, ' + name + '!')          |print('Hello, Alice!')
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
    -UU-:----F1  hello.py       All L3     |-UUU:**--F1  *live-py-trace_hello.py_227
    

When I change the name to Bob, the display on the right immediately changes. I
don't even have to save the file.

    File Edit Options Buffers Tools Python Help                                     
    name = 'Bob'                           |name = 'Bob'
    print('Hello, ' + name + '!')          |print('Hello, Bob!')
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
    -UU-:**--F1  hello.py       All L1     |-UUU:**--F1  *live-py-trace_hello.py_227
    

In this tutorial, I'll demonstrate two things: a live coding display that can be
used to show you what's happening inside your code, and live unit tests. To try
it yourself, follow the Emacs [installation instructions], then type some code,
as in the example above. Finally, launch the Live Python mode with
`M-x live-py-mode`. You should see the display on the right. You can also watch
[my demo video][video].

## Live Coding Display ##
I'll start with a trivial chunk of code where I assign a variable, and then
modify it.

    File Edit Options Buffers Tools Python Help                                     
    s = 'Hello'
    s += ', World!'
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    -UU-:----F1  hello.py       All L3     (Python) --------------------------------
    


That's easy to step through in your head and see that `s` is now
`'Hello, World!'` Remember, though, that I want to let your brain focus on
writing code instead of stepping through it.

I turn on live coding mode with `M-x live-py-mode`, and it opens the live coding
display like the one on the right (below). The display shows me what's in the
variable after each change.

    File Edit Options Buffers Tools Python Help                                     
    s = 'Hello'                            |s = 'Hello'
    s += ', World!'                        |s = 'Hello, World!'
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
    -UU-:----F1  hello.py       All L3     |-UUU:**--F1  *live-py-trace_hello.py_227
    Live-Py mode enabled in current buffer

Let's do something more interesting and write a library function that does
binary search for a value in a sorted array. The live coding will show us what's
happening in our code so we don't have to hold it all in our heads.

    File Edit Options Buffers Tools Python Help                                     
    def search(n, a):                      |
        return -1                          |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
    -UU-:**--F1  hello.py       All L3     |-UUU:**--F1  *live-py-trace_hello.py_227
                                    
It's a bad search function that never finds anything, but let's see how it works
when we call it.

    File Edit Options Buffers Tools Python Help                                     
    def search(n, a):                      |n = 2 | a = [1, 2, 4]
        return -1                          |return -1
                                           |
                                           |
    i = search(2, [1, 2, 4])               |i = -1
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
    -UU-:**--F1  hello.py       All L4     |-UUU:**--F1  *live-py-trace_hello.py_227

You can see the input parameters at the start of the function, and the return
value at the end.

We'll start looking for the value in the array, and the first place to look is
the middle item.

    File Edit Options Buffers Tools Python Help                                     
    def search(n, a):                      |n = 2 | a = [1, 2, 4]
        low = 0                            |low = 0
        high = len(a) - 1                  |high = 2
        mid = low + high // 2              |mid = 1
        if n == a[mid]:                    |
            return mid                     |return 1
        return -1                          |
                                           |
    i = search(2, [1, 2, 4])               |i = 1
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
    -UU-:**--F1  hello.py       All L10    |-UUU:**--F1  *live-py-trace_hello.py_227

That was lucky! It was in the first place we looked, and you can see the
calculations as it goes. You see an abstract formula in the code, like
`high = len(a) - 1`, and you see the concrete result in the live coding
display, like `high = 2`. However, a search function usually won't find the
item we're searching for on the first try. Let's ask for an item earlier in the
list and use a while loop to find it.

    File Edit Options Buffers Tools Python Help                                     
    def search(n, a):                      |n = 1 | a = [1, 2, 4]
        low = 0                            |low = 0
        high = len(a) - 1                  |high = 2
        while True:                        |         |
            mid = low + high // 2          |mid = 1  | mid = 0
            v = a[mid]                     |v = 2    | v = 1
            if n == v:                     |         |
                return mid                 |         | return 0
            if n < v:                      |         |
                high = mid - 1             |high = 0 |
        return -1                          |
                                           |
    i = search(1, [1, 2, 4])               |i = 0
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
    -UU-:**--F1  hello.py       All L1     |-UUU:**--F1  *live-py-trace_hello.py_227

The loop runs twice, and each run adds a column to the display showing the
calculations. That's a good example of how this tool differs from a debugger.
With a debugger, you're always looking at a single moment in time. Here, you
can see the whole history of the search laid out on the screen, and you move
back and forth through time just by moving your eye. It's a lot like the
difference that makes static visualizations of sorting algorithms easier to
follow than animated sorting algorithms.

Now let's look for an item later in the list.

    File Edit Options Buffers Tools Python Help                                     
    def search(n, a):                      |n = 4 | a = [1, 2, 4]
        low = 0                            |low = 0
        high = len(a) - 1                  |high = 2
        while True:                        |        |
            mid = low + high // 2          |mid = 1 | mid = 3
            v = a[mid]                     |v = 2   | IndexError: list index out of$
            if n == v:                     |        |
                return mid                 |        |
            if n < v:                      |        |
                high = mid - 1             |        |
            else:                          |        |
                low = mid + 1              |low = 2 |
        return -1                          |
                                           |
    i = search(4, [1, 2, 4])               |IndexError: list index out of range
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
    -UU-:**--F1  hello.py       All L1     |-UUU:**--F1  *live-py-trace_hello.py_227

Oops, I get an IndexError. Without the live coding display, I would just get a
traceback that shows where the error happened, but not how it happened. Now, I
can walk back from the error to see where things went wrong. `mid` is the index
value, and it's calculated at the top of the loop. The two values that go into
it are both 2, so they should average to 2. Oh, I need parentheses to calculate
the average.

    File Edit Options Buffers Tools Python Help                                     
    def search(n, a):                      |n = 4 | a = [1, 2, 4]
        low = 0                            |low = 0
        high = len(a) - 1                  |high = 2
        while True:                        |        |
            mid = (low + high) // 2        |mid = 1 | mid = 2
            v = a[mid]                     |v = 2   | v = 4
            if n == v:                     |        |
                return mid                 |        | return 2
            if n < v:                      |        |
                high = mid - 1             |        |
            else:                          |        |
                low = mid + 1              |low = 2 |
        return -1                          |
                                           |
    i = search(4, [1, 2, 4])               |i = 2
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
    -UU-:**--F1  hello.py       All L1     |-UUU:**--F1  *live-py-trace_hello.py_227

What happens if we try to find a value that's not in the list?

    File Edit Options Buffers Tools Python Help                                     
    def search(n, a):                      |n = 3 | a = [1, 2, 4]
        low = 0                            |low = 0
        high = len(a) - 1                  |high = 2
        while True:                        |        |          |         |         $
            mid = (low + high) // 2        |mid = 1 | mid = 2  | mid = 1 | mid = 1 $
            v = a[mid]                     |v = 2   | v = 4    | v = 2   | v = 2   $
            if n == v:                     |        |          |         |         $
                return mid                 |        |          |         |         $
            if n < v:                      |        |          |         |         $
                high = mid - 1             |        | high = 1 |         |         $
            else:                          |        |          |         |         $
                low = mid + 1              |low = 2 |          | low = 2 | low = 2 $
        return -1                          |
                                           |
    i = search(3, [1, 2, 4])               |RuntimeError: live coding message limit$
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
    -UU-:**--F1  hello.py       All L1     |-UUU:**--F1  *live-py-trace_hello.py_227

I guess that while True wasn't such a good idea, we're stuck in an infinite
loop. If you want to see some of the later loop runs, you can scroll over to
the right.

From the third run on, the values in the loop don't change, so we probably want
to exit from the second or third run. If you look at the end of the second run,
you can see that high is lower than low. That means that we've searched all the
way from both ends to meet in the middle, and it's time to give up.

    File Edit Options Buffers Tools Python Help                                     
    def search(n, a):                      |n = 3 | a = [1, 2, 4]
        low = 0                            |low = 0
        high = len(a) - 1                  |high = 2
        while low <= high:                 |        |
            mid = (low + high) // 2        |mid = 1 | mid = 2
            v = a[mid]                     |v = 2   | v = 4
            if n == v:                     |        |
                return mid                 |        |
            if n < v:                      |        |
                high = mid - 1             |        | high = 1
            else:                          |        |
                low = mid + 1              |low = 2 |
        return -1                          |return -1
                                           |
    i = search(3, [1, 2, 4])               |i = -1
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
    -UU-:**--F1  hello.py       All L1     |-UUU:**--F1  *live-py-trace_hello.py_227

At this point, I think I'm done. I can add a few entries and search for them to
make sure everything is working. Also, if this were a real library module, I
wouldn't want to execute a call at the end of the file, so I only do it when
I'm in live coding mode.

    File Edit Options Buffers Tools Python Help                                     
    def search(n, a):                      |n = 3 | a = [1, 2, 4]
        low = 0                            |low = 0
        high = len(a) - 1                  |high = 2
        while low <= high:                 |        |
            mid = (low + high) // 2        |mid = 1 | mid = 2
            v = a[mid]                     |v = 2   | v = 4
            if n == v:                     |        |
                return mid                 |        |
            if n < v:                      |        |
                high = mid - 1             |        | high = 1
            else:                          |	|
                low = mid + 1              |low = 2 |
        return -1                          |return -1
                                           |
    if __name__ == '__live_coding__':      |
        i = search(3, [1, 2, 4])           |i = -1
                                           |
                                           |
                                           |
                                           |
                                           |
    -UU-:**--F1  hello.py       All L16    |-UUU:**--F1  *live-py-trace_hello.py_227


## Live Unit Tests ##
In that example, I kept changing the parameters to search for
different items in the list. Wouldn't each set of search parameters
make a nice unit test? I think unit tests help you [write better
code][tdd], so you can use the live coding display as you add each
unit test and make it pass.

In this section, I'll write a function that counts the number of
unique words in a list. However, words with the same letters are
counted as the same word. For example, the words "apple", "lemon", and
"melon" would only count as two words, because "lemon" and "melon"
have the same letters in different order.

To start, I turn off Live Coding mode with `M-x live-py-mode`, then open a new
file `test_anagrams.py` and write a simple unit test that doesn't have any
duplicate words.

    File Edit Options Buffers Tools Python Help                                     
    from unittest import TestCase
    from anagrams import count_anagrams
    
    class AnagramsTest(TestCase):
        def test_words(self):
            words = ['apple', 'melon']
    
            n = count_anagrams(words)
    
            self.assertEqual(2, n)
    
    
    
    
    
    
    
    
    
    
    
    -UU-:**--F1  test_anagrams.py   All L11    (Python) ----------------------------

I can run that test either by switching to another terminal window, or with the
`M-x compile` command in Emacs. Either way, use the command

    python -m unittest test_anagrams
    
Of course, that fails when I run it as a unit test, because I haven't written
`anagrams.py` and the `count_anagrams()` method. I start by creating
`anagrams.py` with a stupid version that always returns zero.

    File Edit Options Buffers Tools Python Help                                     
    
    
    
    def count_anagrams(words):
        return 0
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    -UUU:----F1  anagrams.py    All L4     (Python) --------------------------------

The test now fails with a reasonable complaint.

    File Edit Options Buffers Tools Compile Help                                    
    
    
    
    def count_anagrams(words):
        return 0
    
    
    
    
    
    -UUU:----F1  anagrams.py    All L4     (Python) --------------------------------
    ======================================================================
    FAIL: test_words (test_anagrams.AnagramsTest)
    ----------------------------------------------------------------------
    Traceback (most recent call last):
      File "/home/don/workspace/scratch/test_anagrams.py", line 10, in test_words
        self.assertEqual(2, n)
    AssertionError: 2 != 0
    
    ----------------------------------------------------------------------
    Ran 1 test in 0.000s
    -UUU:%*--F1  *compilation*   22% L10    (Compilation:exit [1]) -----------------


I want to see what's happening as I make the unit test pass, so I close the
compile buffer with `C-x 1`, and launch Live Coding mode with `M-x live-py-mode`.
Nothing happens at first, because nothing is calling my `count_anagrams()`
function. I need to set the driver script to be my unit test, with `C-c M-d` and
then enter this driver script:

    -m unittest test_anagrams

Now, I see the call that the unit test makes:

    File Edit Options Buffers Tools Python Help                                     
                                           |---------------- |
                                           |SystemExit: True |
                                           |---------------- |
    def count_anagrams(words):             |words = ['apple', 'melon']
        return 0                           |return 0
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
    -UU-:----F1  anagrams.py    All L5     |-UUU:**--F1  *live-py-trace_anagrams.py_

I can see the input parameters and the return value, as well as the fact that
the test failed. Next, I make that test pass with the simplest code that could
possibly work.

    File Edit Options Buffers Tools Python Help                                     
                                           |
                                           |
                                           |
    def count_anagrams(words):             |words = ['apple', 'melon']
        return len(words)                  |return 2
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
    -UU-:**--F1  anagrams.py    All L5     |-UUU:**--F1  *live-py-trace_anagrams.py_


Once the test passes, I can add another test method with another
scenario. This one includes two copies of 'melon', so the number of unique
words is still two.

    File Edit Options Buffers Tools Python Help                                     
    from unittest import TestCase
    from anagrams import count_anagrams
    
    File Edit Options Buffers Tools Python Help                                     
    from unittest import TestCase
    from anagrams import count_anagrams
    
    class AnagramsTest(TestCase):
        def test_words(self):
            words = ['apple', 'melon']
    
            n = count_anagrams(words)
    
            self.assertEqual(2, n)
    
        def test_duplicate_words(self):
            words = ['apple', 'melon', 'melon']
    
            n = count_anagrams(words)
    
            self.assertEqual(2, n)
    
    
    
    
    -UU-:----F1  test_anagrams.py   All L18    (Python) ----------------------------

I could make the test pass now, but it's a little confusing when both
tests are being displayed.

    File Edit Options Buffers Tools Python Help                                     
                                           |---------------- |
                                           |SystemExit: True |
                                           |---------------- |
    def count_anagrams(words):             |words = ['apple', 'melon', 'melon'] | w$
        return len(words)                  |return 3                            | r$
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
    -UU-:**--F1  anagrams.py    All L5     |-UUU:**--F1  *live-py-trace_anagrams.py_

Instead, I'll convince Emacs to only run the new test method. That becomes
even more useful as we add more and more test methods. I open the test file, and
rename the new test method to plain `test()`. Then switch back to the
`anagrams.py` file, and use `C-c M-d` to change the driver script to this:

    -m unittest test_anagrams.AnagramsTest.test

The up arrow will cycle through previous driver scripts, so I don't have to type
the whole thing again. From now on, I'll add each test method as plain `test()`
so the driver will run it, then give it a full name when it's passing. Now you
can see the failing test on its own.

To remove duplicates, just put all the words into a set before counting.

    File Edit Options Buffers Tools Help                                            
                                           |$
                                           |$
                                           |$
    def count_anagrams(words):             |$'melon']
        anagrams = set()                   |$
        for word in words:                 |$ = 'melon'                | word = 'me$
            anagrams.add(word)             |$rams = {'melon', 'apple'} |
        return len(anagrams)               |$
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
    -UU-:**--F1  anagrams.py    All L7     |-UUU:**--F1  *live-py-trace_anagrams.py_

When you get to the second copy of 'melon', the set doesn't change. To see the
later iterations of the loop, you might have to use `C-x o` to switch to the
other window, then scroll right.

Now we get to the interesting part: detecting anagrams.

    File Edit Options Buffers Tools Python Help                                     
            n = count_anagrams(words)
    
            self.assertEqual(2, n)
    
        def test(self):
            words = ['apple', 'melon', 'lemon']
    
            n = count_anagrams(words)
    
            self.assertEqual(2, n)
    
    
    
    
    
    
    
    
    
    
    
    -UU-:----F1  test_anagrams.py   Bot L20    (Python) ----------------------------


One way is to sort the letters in each word.

    File Edit Options Buffers Tools Help                                            
                                           |$
                                           |$
                                           |$
    def count_anagrams(words):             |$lon', 'lemon']
        anagrams = set()                   |$
        for word in words:                 |$| word = 'melon'                | word$
            word = ''.join(                |$| word = 'elmno'                | word$
                sorted(word))              |$|                               |
            anagrams.add(word)             |$| anagrams = {'aelpp', 'elmno'} |
        return len(anagrams)               |$                                      $
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
    -UU-:**--F1  anagrams.py    All L10    |-UUU:**--F1  *live-py-trace_anagrams.py_

You can see that the second and third iteration of the loop convert
'melon' and 'lemon' to 'elmno', and the set of `anagrams` doesn't
change in the third iteration.

The next feature I want to add is to treat upper case and lower case
the same, so I add a new test case.

    File Edit Options Buffers Tools Python Help                                     
            n = count_anagrams(words)
    
            self.assertEqual(2, n)
    
        def test_anagrams(self):
            words = ['apple', 'melon', 'lemon']
    
            n = count_anagrams(words)
    
            self.assertEqual(2, n)
    
        def test(self):
            words = ['Melon', 'Lemon']
    
            n = count_anagrams(words)
    
            self.assertEqual(1, n)
    
    
    
    
    -UU-:----F1  test_anagrams.py   Bot L26    (Python) ----------------------------

Back in `anagrams.py`, I see the test fail.

    File Edit Options Buffers Tools Python Help                                     
                                           |$--- |
                                           |$rue |
                                           |$--- |
    def count_anagrams(words):             |$on', 'Lemon']
        anagrams = set()                   |$t()
        for word in words:                 |$'       | word = 'Lemon'
            word = ''.join(                |$'       | word = 'Lemno'
                sorted(word))              |$        |
            anagrams.add(word)             |$Melno'} | anagrams = {'Melno', 'Lemno'$
        return len(anagrams)               |$
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
    -UU-:**--F1  anagrams.py    All L10    |-UUU:**--F1  *live-py-trace_anagrams.py_

You can see that 'Melon' and 'Lemon' get sorted into 'Melno' and
'Lemno', because upper-case letters sort before lower-case letters. We
can fix that by switching all the words to lower case.

    File Edit Options Buffers Tools Python Help                                     
                                           |$--- |
                                           |$rue |
                                           |$--- |
    def count_anagrams(words):             |$on', 'Lemon']
        anagrams = set()                   |$t()
        for word in words:                 |$'       | word = 'Lemon'
            word = ''.join(                |$'       | word = 'Lemno'
                sorted(word))              |$        |
            word = word.lower()            |$'       | word = 'lemno'
            anagrams.add(word)             |$melno'} | anagrams = {'lemno', 'melno'$
        return len(anagrams)               |$
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
    -UU-:**--F1  anagrams.py    All L11    |-UUU:**--F1  *live-py-trace_anagrams.py_

Oops, 'Melon' and 'Lemon' now get sorted into 'melno' and 'lemno'. We
fixed the case, but not the sort order. Switching to lower case
*before* sorting the letters will fix it.

    File Edit Options Buffers Tools Python Help                                     
                                           |$
                                           |$
                                           |$
    def count_anagrams(words):             |$on', 'Lemon']
        anagrams = set()                   |$t()
        for word in words:                 |$'       | word = 'Lemon'
            word = word.lower()            |$'       | word = 'lemon'
            word = ''.join(                |$'       | word = 'elmno'
                sorted(word))              |$        |
            anagrams.add(word)             |$elmno'} |
        return len(anagrams)               |$
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
    -UU-:**--F1  anagrams.py    All L11    |-UUU:**--F1  *live-py-trace_anagrams.py_

Finally, I want to handle foreign words correctly. For example, the
German word for street can be written either as 'Straße' or
'Strasse'. Python knows how to convert from one to the other, so I'll
add another test case.

    File Edit Options Buffers Tools Python Help                                     
    
            self.assertEqual(2, n)
    
        def test_upper(self):
            words = ['Melon', 'Lemon']
    
            n = count_anagrams(words)
    
            self.assertEqual(1, n)
    
        def test(self):
            words = ['Straße', 'Strasse']
    
            n = count_anagrams(words)
    
            self.assertEqual(1, n)
    
    
    
    
    
    -UUU:----F1  test_anagrams.py   Bot L33    (Python) ----------------------------

When I run the new test case, the words are counted separately.

    File Edit Options Buffers Tools Python Help                                     
                                           |---------------- |
                                           |SystemExit: True |
                                           |---------------- |
    def count_anagrams(words):             |words = ['Straße', 'Strasse']
        anagrams = set()                   |anagrams = set()
        for word in words:                 |word = 'Straße'       | word = 'Strasse$
            word = word.lower()            |word = 'straße'       | word = 'strasse$
            word = ''.join(                |word = 'aerstß'       | word = 'aerssst$
                sorted(word))              |                      |
            anagrams.add(word)             |anagrams = {'aerstß'} | anagrams = {'ae$
        return len(anagrams)               |return 2
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
    -UU-:**--F1  anagrams.py    All L7     |-UUU:**--F1  *live-py-trace_anagrams.py_

To fix it, I just switch `lower()` to `casefold()`.

    File Edit Options Buffers Tools Python Help                                     
                                           |
                                           |
                                           |
    def count_anagrams(words):             |words = ['Straße', 'Strasse']
        anagrams = set()                   |anagrams = set()
        for word in words:                 |word = 'Straße'        | word = 'Strass$
            word = word.casefold()         |word = 'strasse'       | word = 'strass$
        word = ''.join(                |word = 'aerssst'       | word = 'aersss$
                sorted(word))              |                       |
        anagrams.add(word)             |anagrams = {'aerssst'} |
        return len(anagrams)	       |return 1
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
    -UU-:**--F1  anagrams.py    All L7     |-UUU:**--F1  *live-py-trace_anagrams.py_

You can see that `casefold()` converts 'ß' to 'ss', while still converting 'S'
to 's', and the test passes.

Now that I've made each test pass, I run the full test suite again to make sure
I didn't break any of the other tests. The easiest way to run it is with
`M-x compile`.

    File Edit Options Buffers Tools Python Help                                     
                                           |-*- mode: compilation; default-director$
                                           |Compilation started at Sat Nov  2 22:48$
                                           |
    def count_anagrams(words):             |python -m unittest test_anagrams
        anagrams = set()                   |.....
        for word in words:                 |---------------------------------------$
            word = word.casefold()         |Ran 5 tests in 0.000s
            word = ''.join(                |
                sorted(word))              |OK
            anagrams.add(word)             |
        return len(anagrams)               |Compilation finished at Sat Nov  2 22:4$
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
                                           |
    -UU-:----F1  anagrams.py    All L7     |-UUU:%*--F1  *compilation*   All L1     
    Compilation finished

It looks good, so I can publish my new library.

Remember, you can find installation instructions and descriptions of all the
other plugins and tools by visiting [donkirkby.github.com][livepy]. Help me test
it, and report your bugs. I'd also love to hear about any other projects working
on the same kind of tools.

[installation instructions]: index.md#installing-the-emacs-mode
[livepy]: index.md
[video]: https://www.youtube.com/watch?v=Vdr2l3yNFH4
[tdd]: https://donkirkby.github.io/testing/
