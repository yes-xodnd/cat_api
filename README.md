# JS Practice Demo

## About
학습한 자바스크립트 개념들을 실습하기 위해 구현한 간단한 웹 어플리케이션입니다.



## Features

### 클래스 컴포넌트

프론트엔드에서 컴포넌트는 독립적인 표현(마크업)과 기능을 가진 UI 조각으로, 모듈화를 통해 

컴포넌트는 클래스로 구현되어 있습니다. 컴포넌트의 구현 과정을 추상화하여 기본 클래스를 정의하고,  다른 컴포넌트에서 상속하여 쉽게 구현할 수 있도록 하였습니다.





사용자 인터페이스(UI)를 구현하는 프론트엔드 개발에서 소프트웨어 

컴포넌트는 분리되고 재사용될 수 있는 독립적인 표현과 기능을 가진 UI의 조각입니다.



- 
- 컴포넌트의 구현 과정을 가장 핵심만 표현하면 다음과 같습니다.
  1. 템플릿을 
  2. 부모 컴포넌트로부터 props를 전달받습니다. 
  3. `template()` 메서드를 정의합니다. 상태값을 반영해야 하므로 문자열을 반환하는 함수로 정의합니다.
  4. `render()` 메서드를 정의합니다. 템플릿 요소에 `innerHTML`을 이용해 앞서 정의한 `template()`의 반환값을 

``` js
class Component {
    constructor(props) {
        this.parent = props.parent;
        this.url = props.url;
		this.text = props.text;
        // ...
    }
    
    template() {
        return `
			<div>
				<img src=${this.url} alt="some image">
				<p>${this.text}</p>
			</div>
		`;
    }
    
    render() {
        const t = document.createElement('template');
        t.innerHTML = this.template();
        this.parent.appendChild(t.content.cloneNode(true));
    }
}
```



