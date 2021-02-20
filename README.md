# JS Practice Demo

## About
학습한 자바스크립트 개념들을 실습하기 위해 구현한 간단한 웹 어플리케이션입니다.



## Features

### 클래스 컴포넌트

- 컴포넌트는 클래스로 구현되어 있습니다.
- 프론트엔드의 컴포넌트는 독립적인 표현(마크업)과 기능, 그리고 데이터(상태)를 가지는 UI 조각입니다. 컴포넌트를 구현하는 데 프로퍼티와 메서드를 갖는 객체로 구현하는 것이 적절하다고 판단하여 클래스를 이용해 구현하였습니다.
- 컴포넌트의 구현 과정을 추상화하여 기본 클래스를 정의하고,  다른 컴포넌트에서 상속하여 쉽게 구현할 수 있도록 하였습니다.

- 컴포넌트의 핵심은 다음과 같이 정리하였습니다.

  1. 표현: `template()`

     - 가독성을 높이기 위해 문자열로 작성하고, `innerHTML`을 통해 DOM 요소로 변환하도록 하였습니다.

     - 상태값을 사용하는 경우를 위해 함수로 구현하였습니다.

       

  2. 데이터

     - 컴포넌트 간 공유되는 데이터는 최상위 컴포넌트 `App`에서 정의해 `props`로 전달합니다.
     - `props`는, 자녀 컴포넌트가 부착될 대상 요소인 `parent` 프로퍼티를 포함해야 합니다.
     - 컴포넌트의 로컬 데이터는 클래스 필드 문법을 사용해 클래스의 프로퍼티로 추가합니다.
       

  3. 기능

     - `init()`: 컴포넌트의 `template`을 포함하는 `fragment`를 생성합니다.
     - `render()`: `parent` 요소에 `fragment`를 부착합니다. 
     - `beforeRender()`: `render()` 메서드가 실행되기 전 실행하는 메서드입니다.
                                             요소를 선택해 이벤트 리스너를 등록하고 여러가지 로직을 수행할 수 있습니다.
     - `selectElement()`: 선택자로 `fragment` 요소를 선택할 수 있습니다. 

- 컴포넌트 기본 클래스와 예시 컴포넌트는 아래와 같습니다.

``` js
// _Component.js

export default class Component {
  constructor(props) {
    Object.keys(props).forEach(item => this[item] = props[item]);

    this.template = Function; // Mandatory
    this.beforeRender = Function; // Optional
  }

  init() {
    const t = document.createElement('template');
    t.innerHTML = (typeof this.template === 'function')
                     ? this.template()
                     : this.template;
    this.fragment = t.content.cloneNode(true);
  }

  selectElement(selector) {
    return this.fragment.querySelector(selector);
  }

  render() {
    if (this.beforeRender) this.beforeRender();
    this.parent.appendChild(this.fragment);
  }
}

// Header.js
import Component from './_Component.js';

export default class Header extends Component {
  
  constructor(props) {
    super(props);
    this.init();
  }
    
  template = `<header><h1>JS Practice Demo</h1></header>`;

  beforeRender() {
    console.log('before render Header');
  }
}
```



