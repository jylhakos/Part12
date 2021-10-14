// Todo.test.js
import { render, screen } from '@testing-library/react';
import TodoView from './TodoView';

const extractTodo = {
    text: 'Do a test todo.',
    done: true
};

describe('A test todo is done', () => {

	test('A todo has text', () => {
		const result = extractTodo.text
    	expect(result).toBe("Do a test todo.")
    })

    test('A todo is true', () => {
    	expect(extractTodo.done).toBe(true)
  	})
})