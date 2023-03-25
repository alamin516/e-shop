import React from 'react';
import useTitle from '../../hooks/useTitle';

const Blogs = () => {
    useTitle('Blogs')
    return (
        <div className='container p-4'>
            <h1 className='text-2xl font-bold text-center'>Blogs</h1>
            <div className='mt-12'>
                <div className='shadow-lg p-6 mb-4'>
                    <h2 className='mb-4 text-xl font-bold'>What are the different ways to manage a state in a React application?</h2>
                    <p>Not only are there are a lot of different kinds of state, but there often dozens of ways of managing each kind. Which should you choose? <br />

                        In this guide, we will uncover the several kinds of state in your React apps that you might not be aware of, plus how to manage them in the most effective way.<br /> The Four Kinds of React State to Manage
                        When we talk about state in our applications, it’s important to be clear about what types of state actually matter. <br />

                        <strong>There are four main types of state you need to properly manage in your React apps:</strong> <br />

                        <li>Local state</li>
                        <li>Global state</li>
                        <li>Server state</li>
                        <li>URL state</li>
                        Let's cover each of these in detail: <br />

                        Local (UI) state – Local state is data we manage in one or another component.

                        Local state is most often managed in React using the useState hook.

                        For example, local state would be needed to show or hide a modal component or to track values for a form component, such as form submission, when the form is disabled and the values of a form’s inputs. <br />

                        <strong>Global (UI) state – Global state is data we manage across multiple components.</strong> <br />

                        Global state is necessary when we want to get and update data anywhere in our app, or in multiple components at least. <br />

                        A common example of global state is authenticated user state. If a user is logged into our app, it is necessary to get and change their data throughout our application. <br />

                        Sometimes state we think should be local might become global. <br />

                        Server state – Data that comes from an external server that must be integrated with our UI state. <br />

                        Server state is a simple concept, but can be hard to manage alongside all of our local and global UI state. <br />

                        There are several pieces of state that must be managed every time you fetch or update data from an external server, including loading and error state. <br />

                        Fortunately there are tools such as SWR and React Query that make managing server state much easier.

                        URL state – Data that exists on our URLs, including the pathname and query parameters.

                        URL state is often missing as a category of state, but it is an important one.
                        In many cases, a lot of major parts of our application rely upon accessing URL state. Try to imagine building a blog without being able to fetch a post based off of its slug or id that is located in the URL!

                        There are undoubtedly more pieces of state that we could identify, but these are the major categories worth focusing on for most applications you build.</p>
                </div>
                <div className='shadow-lg p-6 mb-4'>
                    <h2 className='mb-4 text-xl font-bold'>How does prototypical inheritance work?</h2>
                    <p>Every object with its methods and properties contains an internal and hidden property known as [[Prototype]]. The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object.getPrototypeOf and Object.setPrototypeOf. Nowadays, in modern language, it is being set using __proto__.</p>
                </div>
                <div className='shadow-lg p-6 mb-4'>
                    <h2 className='mb-4 text-xl font-bold'>What is a unit test? Why should we write unit tests?</h2>
                    <p>Unit testing is a software development process in which the smallest testable parts of an application, called units, are individually and independently scrutinized for proper operation. This testing methodology is done during the development process by the software developers and sometimes QA staff.  The main objective of unit testing is to isolate written code to test and determine if it works as intended. <br />

                        Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages. <br />

                        Unit testing is a component of test-driven development (TDD), a pragmatic methodology that takes a meticulous approach to building a product by means of continual testing and revision. This testing method is also the first level of software testing, which is performed before other testing methods such as integration testing. Unit tests are typically isolated to ensure a unit does not rely on any external code or functions. Testing can be done manually but is often automated.</p>
                </div>
                <div className='shadow-lg p-6 mb-4'>
                    <h2 className='mb-4 text-xl font-bold'>React vs. Angular vs. Vue?</h2>
                    <p><strong>React</strong>, developed by Facebook, was initially released in 2013. Facebook uses React extensively in their products (Facebook, Instagram, and WhatsApp). Similar to Vue, the React developers also announce their newest version</p> <br/>
                    <p><strong>Angular</strong>, developed by Google, was first released in 2010, making it the oldest of the lot. It is a TypeScript-based JavaScript framework. A substantial shift occurred in 2016 on the release of Angular 2 (and the dropping of the “JS” from the original name – AngularJS). Angular 2+ is known as just Angular. Although AngularJS (version 1) still gets updates, we will focus the discussion on Angular.</p> <br/>
                    <p><strong>Vue</strong>, also known as Vue.js, is the youngest member of the group. It was developed by ex-Google employee Evan You in 2014. Over the last several years, Vue has seen a substantial shift in popularity, even though it doesn’t have the backing of a large company. The most current version is always announced on the official Vue website on their releases page. Contributors for Vue are supported by Patreon. It should be noted that Vue also has its own GitHub repo, and functions using TypeScript.</p>
                </div>
            </div>
        </div>
    );
};

export default Blogs;