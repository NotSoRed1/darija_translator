import csv
from Trie import Trie
from pathlib import Path





def read_all_csv_files(directory: str) -> list:

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

        if not file.is_dir():
            if not file.name in blacklist:
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

            if not index == (length - 1) and not word == "":
                prefix_tree.insert(word, i) 


    return prefix_tree
