class Node:
    character: str
    childrens: dict 
    index: int # the index of the word in the dataset
               # used to get information about the word
    leaf: bool



    def __init__(self, index: int| None = None, character: str = " ", leaf: bool = False) -> None:
        self.character = character
        self.childrens = {}
        self.index= index 
        self.leaf = leaf



    def has_child(self, c: str):
        return self.childrens.get(c)


    def add_child(self, c: str, node):
        self.childrens[c] = node

        




class Trie:
    root: Node

    def __init__(self):
        self.root = Node(None ," ", False)

    def insert(self, word: str, index: int):
        curr = self.root

        for c in word:
            if not curr.has_child(c):
                curr.add_child(c, Node(index , c, False))

            curr = curr.childrens[c]

        curr.leaf = True




    def _print_recursive(self, node: Node):
        if node == None:
            return

        print(node.character)
        for i in node.childrens.values():
            self._print_recursive(i)

    def print(self):
        self._print_recursive(self.root)




    def contains(self, word: str) -> bool:
        curr = self.root
        for c in word:
            if not curr.has_child(c):
                return False

            curr = curr.childrens[c]

        return curr.leaf == True





    def _complete_prefix_recursive(self, words: list, prefix, node: Node) -> list:
        if node == None:
            return words

        if node.leaf:
            words.append((prefix + node.character, node.index))

        for c in node.childrens.values():
            self._complete_prefix_recursive(words, prefix + node.character, c)

        return words



    def complete_prefix(self, prefix: str) -> list:
        curr = self.root
        for c in prefix:
            if not curr.childrens.get(c):
                return []

            curr = curr.childrens[c]
        words = []
        self._complete_prefix_recursive(words, prefix[:-1], curr)

        return words




