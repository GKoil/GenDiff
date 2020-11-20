<p align="center"><img width="400" src="https://gist.githubusercontent.com/GKoil/baa4a0a14d2703cc8f6c54d8070eb439/raw/c834ba8cb80a6ac65b5491264dd0eb3d7a5c8cc4/svg-project-2.svg"></p>

[![Node CI](https://github.com/GKoil/frontend-project-lvl2/workflows/Node.js%20CI/badge.svg)](https://github.com/GKoil/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/89c36d79620294a2c270/maintainability)](https://codeclimate.com/github/GKoil/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/89c36d79620294a2c270/test_coverage)](https://codeclimate.com/github/GKoil/frontend-project-lvl2/test_coverage)
[![Dependency Status](https://david-dm.org/GKoil/frontend-project-lvl2.svg)](https://david-dm.org/GKoil/frontend-project-lvl2) [![devDependency Status](https://david-dm.org/GKoil/frontend-project-lvl2/dev-status.svg)](https://david-dm.org/GKoil/frontend-project-lvl2?type=dev)
[![time tracker](https://wakatime.com/badge/github/GKoil/frontend-project-lvl2.svg)](https://wakatime.com/badge/github/GKoil/frontend-project-lvl2)

<br/>

## During the creation of the project, I learned:
---
> * To write tests on Jest
> * Read files on Node.js
> * Parsing data from json, yml, ini
> * Build AST and work with it
> * Working with recursion
> * Building an application interface based on the library [commander.js](https://github.com/tj/commander.js/)
---

<br/>

* [About](#About)
* [Installation](#Installation)
  * [npm package](#npm-package)
  * [build](#build)
* [Usage](#Usage)
* [Options](#Options)
* [Examples formatters](#Examples)
  * [Stylish](#Stylish)
  * [Plain](#Plain)
  * [JSON](#JSON)

## About
This program for working in the console, which allows to detect differences between three data formats (json, yml, ini) and output them in three different styles ('stylish', 'plain text' and 'json'). You can use different file formats for comparison (for example, json and ini).
## Installation
You can install gendiff with npm or build it from source.\
**You must have [node.js](https://nodejs.org/en/) installed on your computer (version 14.0 or higher).**
### npm package
To install gendiff using `npm` run
``` 
npm i -g gendiff-gkoil
```
### build
1. Clone the project on your computer
    ```
    git clone git@github.com:GKoil/GenDiff.git
    ```
2. Install dependencies
    ```
    npm i
    ```
3. Build this project
    ```
    make publish
    ```
4. Install it
    ```
    make link
    ```
## Usage
Type `gendiff` in the console and pass the path parameters to the files
```
gendiff ~/project1/before.json ~/project2/after.json
```

Also you can youse difference output [formats](#Options)
## Options
`-V`\
**Find out the version**\
Example:
```
gendiff -V
```
`-h`\
**Get help in console**\
Example:
```
gendiff -h
```
`-f`\
**Choose output stylish format.**\
Example:
```
gendiff -f plain file1.json file2.json
```
## Examples
### Stylish
![Stylish formatter](https://raw.githubusercontent.com/gist/GKoil/7839f2e293ca04dcadf8c455b9c8211d/raw/f449afe388726080d227f419a7a340cf5f1d34a0/gendiff-stylish.svg)
### Plain
![Plain formatter](https://raw.githubusercontent.com/gist/GKoil/7839f2e293ca04dcadf8c455b9c8211d/raw/f449afe388726080d227f419a7a340cf5f1d34a0/gendiff-plain.svg)
### JSON
![JSON formatter](https://raw.githubusercontent.com/gist/GKoil/7839f2e293ca04dcadf8c455b9c8211d/raw/f449afe388726080d227f419a7a340cf5f1d34a0/gendiff-json.svg)
