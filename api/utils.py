import csv
from Trie import Trie
from pathlib import Path





def read_all_csv_files(directory: str) -> list:
    # Can't figure out what to do with those files yet
    # TODO: figure out how to use these files properly
    blacklist = [   
            "(in)definite.csv", "LICENSE", "README.md", 
            "conjug_past.csv", "conjug_present.csv", 
            "femalenames.csv", "imagenet_b_darija.csv", 
            "malenames.csv",  "masculine_feminine_plural.csv", 
            "verb-to-noun.csv", "sentences.csv", "idioms.csv"
            ]

    path = Path(directory)
    dataset = []

    for file in path.iterdir():
        # checking if the name of the file is in the blacklist
        if not str(file).split("/")[1] in blacklist and not file.is_dir():
            dataset += read_csv_file(str(file))


    return dataset





def read_csv_file(file_path: str):
    result = []
    with open(file_path, 'r') as f:
        rows = csv.DictReader(f)

        for row in rows:
            result.append(row)

    return result



def generate_prefix_tree(dataset: list):
    prefix_tree = Trie()

    for i, words in enumerate(dataset):

        length = len(words)
        for index ,word in enumerate(words.values()):

            """
            making sure to not add the english translations and empty words 
            to the prefix tree
            """
            if not index == (length - 1) and not word == "":
                prefix_tree.insert(word, i) # <i> is the index of the word in the list
                                            # used for getting information about the word later


    return prefix_tree
