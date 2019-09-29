# Simple Carousel

This is a simple vanilla JS carousel used to display images. Self contained so it can be dropped into any project. 

The layout is created using flexbox. By allowing flexbox to do the heavy lifting of responsive and adaptive design it leaves the JS to simply add a few classes here and there and control the order flexbox via `order:n`. 

Slide transition effects are handled with preferment CSS transitions, transforming only translateX() properties.




## Tech setup 
- Yarn
- ParceJS (Application bundler)
- CSS (SASS)
- JS (ES6 Transpile via babel)
- Docs (JSDoc style comments for autogen documentation)
- 3rd Party Dependancies 
    - normalise.css (helps with cross browser defaults)
    - hammerjs (swipe events)




## Building and running the project on localhost

Install dependencies:

```sh
yarn install
```

To run in hot module reloading mode:

```sh
yarn start
```

To create a production build:

```sh
yarn build-prod
```
> Fully compressed CSS/JS/HTML 

To run unit tests

```sh
yarn test
```







## Usage 

Instantiate the carousel

```js

import { ImageCarousel } from './ImageCarousel';

const carousel = new ImageCarousel('.selector', {
    numberOfImages: 6, 
    searchTerms: 'cats'
});
```

### Methods 

Move the carousel along one
```js
carousel.next();
```

Move the carousel backwards one
```js
carousel.prev();
```

Move the carousel to any slide index. Method takes a `Number`
```js
carousel.moveTo(4);
```

## Markup 

This carousel requires the following markup.

```html
<ul class="image-carousel">
    <li><img src="my-default-image.jpg" alt="My Default Image"></li>
</ul>
```
> ImageCarousel will add the markup for the additional slides. The first slide can be a placeholder whilst waiting for the images to be returned from the API.

### Config 

These options can be passed in when instantiating the class

| Parameter      | Type   | Default    | Description        |
| -------------- |:-------| ----------:| ------------------ |
| numberOfImages | Number | {required} | How many images do you want to show |
| searchTerms    | String | {required} | Keywords you would like to search for |
| speed | Number | 500 | Duration of transition between slides |
| startPosition | Number | 0 | Index number of the initial slide |
| loop | Boolean | true | Should the carousel infinitely loop |
    
