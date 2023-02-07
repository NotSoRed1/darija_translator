# darija_translator
A fun little project i did using the [darija_open_dataset](https://github.com/darija-open-dataset/dataset)
for translating the Moroccan main language (darija) to english 

features:
- fast auto completion using Trie(prefix tree).
- various categories with more than 10000 words.


### screenshots
![image info](res/screenshot1.png)
![image info](res/screenshot2.png)

## installation
### the api
for windows
```sh
$ cd api
$ pip install -r requirements.txt
$ python -B main.py
```

for mac and linux
```sh
$ cd api
$ pip3 install -r requirements.txt
$ python3 -B main.py
```

### front-end
run
```sh
$ cd front-end
$ npm install
$ npm run dev
```


## tech
- [darija_open_dataset](https://github.com/darija-open-dataset/dataset)
- [FastApi](https://github.com/tiangolo/fastapi)
- [ReactJs](https://github.com/facebook/react)

