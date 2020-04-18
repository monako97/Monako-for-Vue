[TOC]

# React ==library==、==Framework==

__两个概念：__
1. __library	库__
2. __framework 	框架__


```javascript
// <div id=“div” data-sc=“3”>
//     <p>哈哈哈</p>
// </div>
var div = {
    tagName: "div",
    attrs: {
        "id": "div",
        "data-sc": "3"
    },
    childrens: [
        "哈哈哈",
        {
            "agName": "p",
            "attrs": {}
        }
    ]
}
```

## 开始使用

### 先试试最最基本的代码

```jsx
// 1. 导入两个成员的时候，命名必须这样写
import React from "react";  // 创建组件、虚拟Dom元素、生命周期
import ReactDom from "react-dom";   // 把创建好的 组件 和 虚拟Dom 放到页面上展示

// 2. 创建虚拟 Dom 元素
/**
 * @param   String   创建元素的类型，表示元素的名称
 * @param   Object/null    表示当前这个 Dom 元素的属性
 * @param   child   子节点（包括其他虚拟 Dom 获取文本子节点）
 * @param   ...     子节点
 **/
// <h1 id="myh1" title="this myh1">这是一个H1</h1>
const myh1 = React.createElement("h1", {id: "myh1", title: "this myh1",}, "这是一个H1");
const myDiv = React.createElement("div", null, "这是一个div元素", myh1);

// 注意：在 JS 文件中，默认不能写Html
//      可以使用 babel 来转换这些 JS 中的标签 --> babel-preset-react
//      这种在 JS 中，混合写入类似于 HTML 的语法，叫 JSX 语法。
//      JSX 语法的本质，还是在运行的时候被转换成了 React.createElement 形式来执行的
//      符合 XML 规范的 JS !!!   符合 XML 规范的 JS !!!   符合 XML 规范的 JS !!!
const num = 10;
const str = "你好，react！！！";
const bool = true;
// 注意：React 中，需要把 key 添加给被 forEach ｜ map ｜ for循环直接控制的元素
const arr = [
    <h4 key={str}>{num / 2}：{str}</h4>,
    <h2 key={num + str}>{bool ? "真" : "假"}</h2>
];
// 当我们需要在 JSX 控制的区域内，写 JS 表达式的时候，需要使用 { }
const title = "哈哈哈";
const arrStr = ["呜呜呜", "嘟嘟嘟嘟", "哒哒哒哒"];
// 定义一个空数组，将来用来存放 名称 标签
let newArr = [];
arrStr.forEach((item, index) => {
    newArr.push(
        <h4 key={item}>{index}：{item}</h4>,
        <hr key={item + index}/>
    );
});
const myTest =
    <div title={ title }>
        { arr }
        <hr/>
        { newArr }
        {   // 数组的 map 方法，得到一个新数组，必须要写 return
            arrStr.map((item,index) => {
                return <a key={ item } href="http://www.baidu.com">{ item + "～～～" + index }</a>;
            })
        }
        { myDiv }
        {/*在jsx中，标签的 class 需要用 className 来代替，for 则使用 htmlFor*/}
        <p className="ppp">这是一个p标签</p>
        <label htmlFor="password"/>
        <input id="password" type="text"/>
    </div>;

// 3. 使用 ReactDom 把 虚拟Dom 渲染到页面上
/**
 * @param   要渲染的 虚拟Dom
 * @param   指定页面上一个容器 Dom
 **/
ReactDom.render(myTest, document.getElementById("monako"));
```

## 创建组件的方式

### 方法一

```jsx
import React from "react";
/**
 * 注意：组件的名称首字母必须大写
 * 如果，在一个组件中 return 一个 null，则表示此组件是空的，什么都不会渲染
 * @param props 不论是 Vue 还是 React，组件中的 props 永远都是只读的，不能被重新赋值
 * @return { Hello } 在组件中，必须返回一个合法的 JSX 虚拟 DOM 元素
 */
export default function Hello(props) {
    return <img src={ props.avatar } alt={ props.name } title={ props.gender + props.age }/>;
}
```

### 方法二

> 使用 class 关键字来创建组件
>
> ES6 中 class 关键字，是实现面向对象编程的新形式

```jsx
export class Hero extends React.Component {
    constructor(props) {
        // 由于 Hero 组件，继承了 React.Component 这个父类，所以，自定义的构造器中，必须调用 super()
        super(props);
        // 只有调用了 super 后，才能使用 this 关键字
        this.state = {
            // 这个 this.state = {} 就相当于 Vue 中的 data(){ return {} }
            msg: "大家好，我是 class 创建的 Hero 组件"
        }
    }
    render() {
        // 在 class 创建的组件中，如果想使用外界传递的 props 参数，不需要接收，直接 this.props 就可访问
        // 无论是 class 还是普通 function 创建的组件，它们的 props 都是只读的
        // 在 class 创建的组件中，this.state 上的数据，都是可读可写的
        this.state.msg = this.state.msg + ": 我被修改了";
        return <div>
            <button>{ this.props.name }：{ this.state.msg }</button>
            <button>{ this.props.age }</button>
        </div>;
    }
}
```

### 使用组件

```jsx
const girl = {
    name: "白菜",
    avatar: "https://i.loli.net/2019/12/09/964vMwZnEuOictz.gif",
    age: 18,
    gender: "母"
};
{/*直接把组件的名称，以标签形式，丢到页面上即可*/}
<Hello avatar={girl.avatar} name={girl.name} gender={girl.gender} age={girl.age}/>
{/*或者*/}
<Hello {...girl}/>
```

### Class

```javascript
function Person(name,age) {
    this.name = name;
    this.age = age;
}
const person = new Person("瓶多多",16);
// 通过 new 出来的实例，访问到的属性，叫做【实例属性】
console.log("实例属性："+person.name);
console.log("实例属性："+person.age);
// 【静态属性】：通过构造函数，直接访问到的属性，叫做静态属性
Person.gender = "boy";
// gender 属性直接挂载给了构造函数，所以他是静态属性
console.log("静态属性：" + Person.gender);
// 实例方法
Person.prototype.say = () => {
    console.log("这个是 Person 的实例方法");
};
person.say();
// 静态方法
Person.ship = () => {
    console.log("这是 Person 的静态方法");
};
Person.ship();
// ------------- 分割线 -------------
console.log("-------------");
// 创建了一个 动物类
class Animal{
    /**
     * 这是类中的构造器
     * 每一个类中，都有一个构造器，如果我们程序员没有手动指定构造器，
     * 那么可以认为这个类内部又一个隐形的，看不见的，空构造器
     * 类似于 constructor() {}
     * 作用：优先执行
     * */
    constructor(name,age){
        // 实例属性
        this.name = name;
        this.age = age;
    }
    // 在 class 内，通过static修饰的属性，就是静态属性
    static info = "OOO";
    // 这是 class 内的实例方法。经常会用到
    eat(){
        console.log("这是 动物 的实例方法")
    }
    // 静态方法
    static ship(){
        console.log("这是 动物 的静态方法")
    }
}
const animal = new Animal("挑毛小子",15);
console.log(animal);
console.log("静态属性：" + Animal.info);
animal.eat();
Animal.ship();
```

继承

```javascript
// 父类   【可以理解成父类就是原型对象】
class PersonCountry {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
// 继承父类 extends
class Country extends PersonCountry{
    static idNumber = 0;
    constructor(name, age, id) {
        // 当子类需要重写写构造函数时，必须手动调用super()
        super(name, age);
        if (id) this.id = Country.idNumber+=1;
    }
}
const american = new Country("美国", 200);
const china = new Country("中国", 5000, true);
const japan = new Country("日本", 5000, true);
console.log(american,china,japan);
```

### 两种创建组件方式的对比

> 注意：
>
> ​	使用class创建的组件有自己的私有数据和生命周期；
>
> ​	使用构造函数创建的组件只有props，没有自己的私有数据和生命周期函数；

1. 使用构造函数创建出来的组件，叫做无状态组件
2. 用class关键字创建出来的组件，叫做有状态组件
3. 什么情况下使用有状态组件？什么情况下使用无状态组件
   1. 如果一个组件需要有自己的私有数据，则推荐使用 class 创建的有状态组件
   2. 如果一个组件不需要有私有的数据，则使用无状态组件
   3. React官方说：无状态组件，由于没有自己的 state 和 生命周期函数，所以运行效率会比有状态组件稍微高一些
4. 组件中的 props 和 state 的区别
   1. props 中的数据都是外界传递过滤的
   2. state 的数据都是组件私有的。（通过 ajax 获取的数据一般都是私有数据）
   3. props 中的数据都是只读的
   4. state 中的数据，都是可读可写的

> 有状态组件和无状态组件之间本质的区别就是：有无state属性

## 案例

### 评论列表

```jsx
import React from "react";
export class ComponentList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            list: [
                { id: 1, title: "掌声", sub_title: "掌声掌声" },
                { id: 2, title: "顽固不化", sub_title: "顽固不化顽固不化" },
                { id: 3, title: "历史", sub_title: "历史顽固不化" },
                { id: 4, title: "找刘", sub_title: "历史找刘" },
                { id: 5, title: "初期", sub_title: "初期初期阿三" },
            ]
        }
    }
    render() {
        return <div>
            <h1 style={{
                backgroundColor: "red",
                color: "white",
                fontWeight: 300
            }}>这是评论列表</h1>
            <div>
                {
                    this.state.list.map(e => {
                        return <Card {...e} key={e.id}/>
                    })
                }
            </div>
        </div>
    }
}
/**
 * @param props
 * { title: "", sub_title: "" }
 * @return Element
 * */
const styles = {
    item: {
        border: "1px solid black",
        padding: "10px",
        margin: "5px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(255, 255, 255, 1) inset,0 0 5px rgba(0, 0, 0, 0.5)",
        backgroundColor: "pink"
    },
    title: {margin: 0,color: "#fff"}
};
export default function Card(props) {
    {/*
        注意：在jsx中，如果要写行内样式了，不能设置字符串的值
        语法：style={{ backgroundColor: "red" }}
        行内样式中，数值类型的样式，则可以不用引号包裹，如果是 字符串类型的样式值，必须用引号包裹
    */}
    return <div style={styles.item}>
        <h4 style={styles.title}>{props.title}</h4>
        <p style={
            styles.item
        }>{props.sub_title}</p>
    </div>
}
```

## 样式

> 注意:   在jsx中，如果要写行内样式了，不能设置字符串的值
>            语法：style={{ backgroundColor: "red" }}
>            行内样式中，数值类型的样式，则可以不用引号包裹，如果是 字符串类型的样式值，必须用引号包裹

### 问题：

> React 中，没有 Vue 中的 scoped 这样的指令，那么要如何去防止 css 样式污染呢？

1. 可以在 css-loader 之后，通过 ？追加参数

   其中有个固定的参数，叫做 modules，表示为普通的 css 样式表，启用模块化

2. 使用 localIdentName 自定类名

   ```js
   {
     test: /\.(sa|sc|c)ss$/,
       use: [
         process.env.NODE_ENV === 'development' ? 'style-loader' : {
           loader: MiniCssExtractPlugin.loader,
           options: {
             hmr: process.env.NODE_ENV === 'development',
             modules: true,
             getLocalIdent: (context, localIdentName, localName, options) => {
               return localName
             },
             publicPath: '../'
           },
         },
         {
           loader: "css-loader",
           options: {
             modules: { 
               // modules：启用模块化, localIdentName：自定类名, [path] 使用文件路径, [name] 文件名
               localIdentName: "[path][name]-[local]-[hash:5]"
             }
           }
         },
         'sass-loader',
         'postcss-loader'
       ],
       exclude: /node_modules/, // 排除项
   }
   ```

   

```jsx
import style_title from '../../style/list';
// 使用模块化之后的 css 样式表会暴露出一个对象
// css模块化只针对 类选择器和id选择器有效
<h4 className={style_title.title}>可以使用 style_title.类名 获取</h4>
```

## 事件绑定

>  在 react 中，有一套自己的事件绑定机制，事件名，是小驼峰命名

```jsx
class Bind_event extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title: "这是一个按钮",
            msg: "这个是默认的"
        }
    }
    // 这是一个实例方法
    clickHandler = param => {
        // 注意：在 react 中，如果想为 state 中的数据重新赋值，
        // 应该调用 react 提供的异步方法 this.setState();
        // this.state.title = "改变了按钮：" + param;
        this.setState({
            title: "改变了按钮：" + param
        },()=>{
            // 当设置完毕之后的回调
            console.log(this.state.title);
        });
    };
    textChange = param => {
        // 在 onChang 中，获取文本框的值
        // 1、通过 onChang 的第一个参数获取 e => this.textChange(e)
        // console.log(param.target); // 得到文本框的dom
        // 2. 直接通过 ref 获取
        console.log(this.refs.input.value);
        this.setState({
           title: param.target.value
        });
    };
    render() {
        // 在 react 中，有一套自己的事件绑定机制，事件名，是小驼峰命名
        return <div>
            <button onClick={ () => this.clickHandler("按钮") }>
                { this.state.title }
            </button>
            {/* 当为文本框绑定 value 值之后，要么同时提供一个 readOnly，要么提供一个 onChange 处理函数 */}
            <input ref="input" type="text" value={this.state.title} onChange={ e => this.textChange(e) }/>
        </div>
    }
}
```

## 生命周期

__分为三部分：__

### 挂载阶段(Mounting)

> 当创建一个组件的时候，它会挂载到DOM

1. **constructor()**

* 当页面加载的时候，最初也是唯一一次被调用
* 用于做一些初始化状态的操作
* 唯一可以修改state的地方(因为react一般想要修改state，一般会调用setState方法)

2. **static getDerivedStateFromProps(nextProps, prevState)**

* 当state需要从props初始化时使用
* 每次render或者rerender的时候都会调用
* 尽量不要使用：维护两者一致性会增加复杂度
* 典型场景：表单控件获取默认值

3. **render()**

* 这是类组件中唯一必需的方法
* 每次React更新并提交到DOM的时候调用
* 用于为组件编写JSX

4. **componentDidMount()**

* 在构造组件并将其添加到DOM上(渲染后)只执行一次
* 可用于获取数据并在渲染完成后立即显示
* 典型场景：获取外部资源

### 运行阶段(Updating)

> 每当一个组件的state和props改变的时候，将在页面上重新进行渲染

1. **static getDerivedStateFromProps(nextProps, prevState)**

* 每次页面render之前调用，state已更新
* 典型场景：获取render之前的DOM状态
* 很少使用：将props复制到state

2. **shouldComponentUpdate(nextProps, nextState)**

* 返回一个布尔类型的值，默认返回true
* 在渲染(render)之前或组件接受到新的state和props的时候马上执行
* 在每次重新渲染之前调用，但不是初始化操作时调用
* 决定Virtual Dom是否要重绘
* 对于性能优化，可以做一些不必重新渲染的操作
* 因为react父组件的重新渲染会导致其所有子组件的重新渲染，这个时候其实我们是不需要所有子组件都跟着重新渲染的，因此需要在子组件的该生命周期中做判断

3. **render()**

* 对于一个类组件，这是唯一必需的方法
* 对于更新，如果shouldComponentUpdate()，返回false，则不会调用render()

4. **getSnapshotBeforeUpdate(prevProps, prevState)**

* 此方法允许我们捕获在呈现该组件之前未存储在该状态中的某些属性。（即，如果用户滚动到页面上的特定位置，并且我们想要存储该位置并在以后使用它）
* 在React更新并提交新的内容到DOM之前调用
* 很少使用但可以捕获可能快速变化的数据

5. **componentDidUpdate(previousProps, previousState, snapshot)**

* 在组件已经重新渲染之后调用
* 用于渲染后的任何DOM更新

### 销毁阶段(UnMounting)

> 组件将被删除并从DOM中清除

1. **componentWillUnmount**

* 在从DOM卸载组件之前调用它，做一些回收类的操作，如清除定时器等

![](https://i.loli.net/2020/01/03/YOI8obKRFu7nG49.jpg)

```jsx
// prop-types 职能只提供了一些常见的数据类型，用于做类型校验
// import reactTypes from "prop-types";
export default class Bind_event extends React.Component{
    constructor(props) {
        super(props);
    }
    // 在 React 中，使用静态的 defaultProps 属性，来设置组件的默认属性值
    static defaultProps = { 
      count: 0 
    };
    // 在 React 中，使用静态的 propTypes 属性，可以把外界传递过来的属性做类型校验
    // 注意：v15.* 之后，React 团队把类型校验单独抽离，如果要做类型校验必须安装 React 提供的第三方包：prop-types
    // static propTypes = {};
    componentWillMount() { // v17.* 开始将删除这个钩子
        // 此时无法获取到页面上的任何元素，虚拟 dom 和 页面都还没有开始渲染，等同于 created
        // 可以获取到 props 和 state;
        console.log("componentWillMount："+this.props+this.state);
    }
    render() {
        // 当执行到这里时，就即将要渲染内存中的虚拟dom了，但还未真正渲染dom
        // 在return 之前，虚拟dom还没有开始创建，当return之后，虚拟dom就创建好了，但是还没有真正的挂载到页面中
        // 在 react 中，有一套自己的事件绑定机制，事件名，是小驼峰命名
        return <div>
            <button>
                { this.state.title }
            </button>
            {/* 当为文本框绑定 value 值之后，要么同时提供一个 readOnly，要么提供一个 onChange 处理函数 */}
            <input ref="input" type="number" value={this.props.count} onChange={ e => this.textChange(e) }/>
        </div>
    }
    componentDidMount() {
        // 当组件挂载到页面上之后进入的函数，操作 dom 最早在这里
        console.log(this.refs.input);
    }
    // 这是一个实例方法
    clickHandler = param => {
        // 注意：在 react 中，如果想为 state 中的数据重新赋值，
        // 应该调用 react 提供的异步方法 this.setState();
        // this.state.title = "改变了按钮：" + param;
        this.setState({
            title: "改变了按钮：" + param
        },()=>{ // 当设置完毕之后的回调
            console.log(this.state.title);
        });
    };
    textChange = param => {
        // 在 onChang 中，获取文本框的值
        // 1、通过 onChang 的第一个参数获取 e => this.textChange(e)
        // console.log(param.target); // 得到文本框的dom
        // 2. 直接通过 ref 获取
        console.log(this.refs.input.value);
        this.setState({
            title: param.target.value
        });
    };
}

```

