---
id: getting-started-with-remote-packages-fe
title: "Getting Started with Remote Packages: A Beginner's Guide to Ditching Generated Code"
description: "Empowering Front-End Development with Remote Packages: A Guide to Ditching Generated Code"
---

Protobuf is a fantastic way to programmatically define your APIs and generate away a lot of the common work we perform
as software engineers to communicate across our services. Protobuf plugins and Code generation can bring several
benefits to client-side development, particularly in terms of integration. Some advantages of code generation for
client-side development include:

* Improved Consistency: Code generation can help ensure that the client-side code matches the server-side code, leading
  to improved consistency and reduced risk of errors.

* Reduced Boilerplate: Code generation can automate the creation of repetitive or boilerplate code, freeing up time and
  resources that can be redirected towards more creative and strategic projects.

* Enhanced Productivity: By using code generation, developers can focus on writing the core logic of their application,
  while the generated code takes care of the rest. This can result in a significant increase in productivity.

* Improved Integration: Code generation can improve the integration between the client and server by ensuring that both
  sides are using the same data structure and communication protocol. This makes it easier to integrate the different
  components of an application, leading to faster and more efficient development.

However, it's important to keep in mind that whilst an improvement, code generation also has its own set of challenges,
such as increased maintenance overhead and team synchronisation issues. These limitations can be mitigated by using
remote packages instead of checked-in, generated code.

## Understanding Generated Code

Ok, let us take a step back - Generated code is code that is generated automatically by a protobuf plugin and tool
like `buf`, rather than being written manually by a developer. It's often used in the context of code generation tools
like Swagger or Protobuf, which generate client or server stubs for API development. In this context, generated code
saves time in the short and long term, but it's definitely not perfect. Often times, there is a disconnect between the
API development team and their technical landscape(particularly package management system) and that of their consumers.

## The Benefits of Remote Packages

Remote packages, on the other hand, offer a number of benefits over manually managing generated code. Remote packages
are buf-managed plugins what are available automatically on any of your Buf modules that you can depend on and use in
your project, rather than having to execute build and deploy yourself. This makes it much easier to manage your
plugins, as you don't have to worry about maintaining and updating the code. Additionally, remote packages are usually
more stable and reliable than generated code, as our team have put in the time end effort to make sure that the package
management conforms to language-specific standards.

## Example

Connect-Web is a small library to call remote procedures from a web browser. Unlike REST, you get a type-safe client and
never have to think about serialization again.

In this guide, we'll use Connect-Web to create a web interface for [ELIZA](https://en.wikipedia.org/wiki/ELIZA), a very
simple natural language processor built in the 1960s to represent a psychotherapist. The ELIZA service is already up and
running, and it defines a Protocol Buffer schema we'll use to generate a Connect-Web client.

## Prerequisites

* You'll need [Node.js](https://nodejs.dev/download) - we recommend the long-term support version (LTS).
* We'll use the package manager `npm`, but we are also compatible with `yarn` and `pnpm`.

## Prepare

First, we'll configure our front end using [Vite](https://vitejs.dev/). We're using `vite` to make a fast development
server with built-in support for everything we'll need later.

```bash
$ npm create vite@latest -- connect-web-example --template react-ts
$ cd connect-web-example
$ npm install
```

## Fetching the Remote Package

Next, let's generate some code from the [Protocol Buffer schema for ELIZA](https://buf.build/bufbuild/eliza). We will
use [remote packages](https://docs.buf.build/bsr/remote-packages/overview). The first command tells npm to look
up `@buf` packages on the registry. The `install` command generates the types we need on the fly:

```bash
$ npm config set @buf:registry https://buf.build/gen/npm/v1
$ npm install @buf/bufbuild_eliza.bufbuild_connect-web
```

Now we can import the service from the package and set up a client. Add the
following to `App.tsx`:

```tsx title="src/App.tsx"
import {
    createConnectTransport,
    createPromiseClient,
} from "@bufbuild/connect-web";

// Import service definition that you want to connect to.
import {ElizaService} from "@buf/bufbuild_eliza.bufbuild_connect-web/buf/connect/demo/eliza/v1/eliza_connectweb";

// The transport defines what type of endpoint we're hitting.
// In our example we'll be communicating with a Connect endpoint.
const transport = createConnectTransport({
    baseUrl: "https://demo.connect.build",
});

// Here we make the client itself, combining the service
// definition with the transport.
const client = createPromiseClient(ElizaService, transport);
```

## Building the App

Now that you have your client all configured and working, we can hook it into a live application. We will be
using [React](https://reactjs.org/) to create the user interface, but Connect-Web is framework-agnostic and even works
with vanilla Javascript.

```bash
npm run dev
```

This will start your web server and open the browser to the basic skeleton. Any changes to your source code will
automatically refresh the browser.

Let's clear the slate of the initialized `App()` component:

```tsx title="src/App.tsx"
function App() {
    return <>Hello world</>;
}
```

The purpose of ELIZA is to represent a chat between the user and the server, so we'll want to initialize a form to
facilitate communication. In this form we'll have an input and a button to submit.

```tsx title="src/App.tsx"
function App() {
    // highlight-start
    return <>
        <form>
            <input/>
            <button type="submit">Send</button>
        </form>
    </>;
    // highlight-end
}
```

This allows the user to enter some text and submit but nothing actually happens. It just refreshes the page when you
click send. We need to do a few things to change that.

First, let's capture the users input and store that as state. That will allow us to control it easily:

```tsx title="src/App.tsx"
function App() {
    // highlight-next-line
    const [inputValue, setInputValue] = useState("");
    return <>
        <form>
            {/* highlight-next-line */}
            <input value={inputValue} onChange={e => setInputValue(e.target.value)}/>
            <button type="submit">Send</button>
        </form>
    </>;
}
```

### Hooking up the client

Next, let's capture the form submit operation and prevent refreshing the page. Here we can also start to actually
interact with our client created in the[previous step](#fetching-the-remote-package) and send our`inputValue`.

```tsx title="src/App.tsx"
function App() {
    const [inputValue, setInputValue] = useState("");
    return <>
        {/* highlight-start */}
        <form onSubmit={async (e) => {
            e.preventDefault();
            await client.say({
                sentence: inputValue,
            });
        }}>
            {/* highlight-end */}
            <input value={inputValue} onChange={e => setInputValue(e.target.value)}/>
            <button type="submit">Send</button>
        </form>
    </>;
}
```

The above is doing the bare minimum to communicate with the server and doesn't display the results from the server.
We'll fix that by adding logic to track the messages sent to the server and any responses received.

```tsx title="src/App.tsx"
  const [inputValue, setInputValue] = useState("");
// highlight-start
const [messages, setMessages] = useState<
    {
        fromMe: boolean;
        message: string;
    }[]
>([]);
// highlight-end
return <>
    <form onSubmit={async (e) => {
        e.preventDefault();
        // highlight-start
        // Clear inputValue since the user has submitted.
        setInputValue("");
        // Store the inputValue in the chain of messages and
        // mark this message as coming from "me"
        setMessages((prev) => [
            ...prev,
            {
                fromMe: true,
                message: inputValue,
            },
        ]);
        const response = await client.say({
            sentence: inputValue,
        });
        setMessages((prev) => [
            ...prev,
            {
                fromMe: false,
                message: response.sentence,
            },
        ]);
        // highlight-end
    }}>
```

The above stores the messages but does not actually display them anywhere. We can write a simple list view to show the
message chain:

```tsx title="src/App.tsx"
  return <>
    {/* highlight-start */}
    <ol>
        {messages.map((msg, index) => (
            <li key={index}>
                {`${msg.fromMe ? "ME:" : "ELIZA:"} ${msg.message}`}
            </li>
        ))}
    </ol>
    {/* highlight-end */}
    <form onSubmit={async (e) => { ...
    }}>
    </>
```

## Wrapping up

And that's it &mdash; you've successfully made a tiny web interface for ELIZA with Vite and React.

We ran the following commands to build the app:

```bash
$ npm create vite@latest -- connect-web-example --template react-ts
$ cd connect-web-example
$ npm config set @buf:registry https://buf.build/gen/npm/v1
$ npm install @buf/bufbuild_eliza.bufbuild_connect-web
$ npm run dev
```

And wrote the following source code:

```tsx title="src/App.tsx"
import {useState} from 'react'
import './App.css'

import {
    createConnectTransport,
    createPromiseClient,
} from "@bufbuild/connect-web";

// Import service definition that you want to connect to.
import {ElizaService} from "@buf/bufbuild_eliza.bufbuild_connect-web/buf/connect/demo/eliza/v1/eliza_connectweb";

// The transport defines what type of endpoint we're hitting.
// In our example we'll be communicating with a Connect endpoint.
const transport = createConnectTransport({
    baseUrl: "https://demo.connect.build",
});

// Here we make the client itself, combining the service
// definition with the transport.
const client = createPromiseClient(ElizaService, transport);

function App() {
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState<
        {
            fromMe: boolean;
            message: string;
        }[]
    >([]);
    return <>
        <ol>
            {messages.map((msg, index) => (
                <li key={index}>
                    {`${msg.fromMe ? "ME:" : "ELIZA:"} ${msg.message}`}
                </li>
            ))}
        </ol>
        <form onSubmit={async (e) => {
            e.preventDefault();
            // Clear inputValue since the user has submitted.
            setInputValue("");
            // Store the inputValue in the chain of messages and
            // mark this message as coming from "me"
            setMessages((prev) => [
                ...prev,
                {
                    fromMe: true,
                    message: inputValue,
                },
            ]);
            const response = await client.say({
                sentence: inputValue,
            });
            setMessages((prev) => [
                ...prev,
                {
                    fromMe: false,
                    message: response.sentence,
                },
            ]);
        }}>
            <input value={inputValue} onChange={e => setInputValue(e.target.value)}/>
            <button type="submit">Send</button>
        </form>
    </>;
}

export default App
```

In case you mistype a request or response property — let's say you misspell `sentence` as `sentense` — you are made
aware of the error immediately.