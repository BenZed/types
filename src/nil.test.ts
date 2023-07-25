import { isNil, toNil, asNil, nil } from './nil'
import { it, expect } from '@jest/globals'

//// Setup ////

class Node {
    parent: Node | nil = nil
}

// TODO: Create @benzed/eslint-plugin with prefer-void rule

//// Tests ////

it('is using void instead of null and undefined a good idea?', () => {
    const node = new Node()
    node.parent = void Node

    expect(node.parent).toBe(void Node)
})

it('what about for params', () => {
    function logNode(node: void | Node, depth: void | number): void {
        void node
        void depth
    }

    logNode() // Optional by default. We don't need the '?' modifier.

    logNode(void Node, void Number) // I don't like void Number as much as void Node.
    logNode(new Node(), void 0) // I think I like void 0 less than void Number
})

it('what about for destructuring', () => {
    const nodes: (void | Node)[] = [
        new Node(),
        void Node,
        new Node(),
        void Node
    ]

    const [n1 = new Node(), n2 = new Node()] = nodes

    expect(n1).toBeInstanceOf(Node)
    expect(n2).toBeInstanceOf(Node)
})

it('what about objects', () => {
    interface Options {
        node: void | Node
        value: number
    }

    const options: Options = { value: 100, node: void Node }
    expect(options).toEqual({
        value: 100,
        node: void Node
    })
})

it('isNil', () => {
    expect(isNil(undefined)).toBe(true)
    expect(isNil(null)).toBe(true)
    expect(isNil(NaN)).toBe(true)
})

it('toNil', async () => {
    const value = await Promise.resolve(0).then(toNil)
    expect(value).toEqual(void 0)
})

it('asNil', () => {
    expect(asNil(0)).toBe(0)
    expect(asNil('')).toBe('')
    expect(asNil(null)).toBe(nil)
    expect(asNil(undefined)).toBe(nil)

    asNil(0) satisfies number
    asNil('') satisfies string
    asNil(false) satisfies boolean

    asNil(null) satisfies nil
    expect(asNil(null)).toEqual(nil)

    asNil(undefined) satisfies nil
    expect(asNil(undefined)).toEqual(nil)

    expect(asNil(NaN)).toEqual(nil)
})
