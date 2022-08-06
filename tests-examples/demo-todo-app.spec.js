"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
test_1.test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
});
const TODO_ITEMS = [
    'buy some cheese',
    'feed the cat',
    'book a doctors appointment'
];
test_1.test.describe('New Todo', () => {
    (0, test_1.test)('should allow me to add todo items', async ({ page }) => {
        // Create 1st todo.
        await page.locator('.new-todo').fill(TODO_ITEMS[0]);
        await page.locator('.new-todo').press('Enter');
        // Make sure the list only has one todo item.
        await (0, test_1.expect)(page.locator('.view label')).toHaveText([
            TODO_ITEMS[0]
        ]);
        // Create 2nd todo.
        await page.locator('.new-todo').fill(TODO_ITEMS[1]);
        await page.locator('.new-todo').press('Enter');
        // Make sure the list now has two todo items.
        await (0, test_1.expect)(page.locator('.view label')).toHaveText([
            TODO_ITEMS[0],
            TODO_ITEMS[1]
        ]);
        await checkNumberOfTodosInLocalStorage(page, 2);
    });
    (0, test_1.test)('should clear text input field when an item is added', async ({ page }) => {
        // Create one todo item.
        await page.locator('.new-todo').fill(TODO_ITEMS[0]);
        await page.locator('.new-todo').press('Enter');
        // Check that input is empty.
        await (0, test_1.expect)(page.locator('.new-todo')).toBeEmpty();
        await checkNumberOfTodosInLocalStorage(page, 1);
    });
    (0, test_1.test)('should append new items to the bottom of the list', async ({ page }) => {
        // Create 3 items.
        await createDefaultTodos(page);
        // Check test using different methods.
        await (0, test_1.expect)(page.locator('.todo-count')).toHaveText('3 items left');
        await (0, test_1.expect)(page.locator('.todo-count')).toContainText('3');
        await (0, test_1.expect)(page.locator('.todo-count')).toHaveText(/3/);
        // Check all items in one call.
        await (0, test_1.expect)(page.locator('.view label')).toHaveText(TODO_ITEMS);
        await checkNumberOfTodosInLocalStorage(page, 3);
    });
    (0, test_1.test)('should show #main and #footer when items added', async ({ page }) => {
        await page.locator('.new-todo').fill(TODO_ITEMS[0]);
        await page.locator('.new-todo').press('Enter');
        await (0, test_1.expect)(page.locator('.main')).toBeVisible();
        await (0, test_1.expect)(page.locator('.footer')).toBeVisible();
        await checkNumberOfTodosInLocalStorage(page, 1);
    });
});
test_1.test.describe('Mark all as completed', () => {
    test_1.test.beforeEach(async ({ page }) => {
        await createDefaultTodos(page);
        await checkNumberOfTodosInLocalStorage(page, 3);
    });
    test_1.test.afterEach(async ({ page }) => {
        await checkNumberOfTodosInLocalStorage(page, 3);
    });
    (0, test_1.test)('should allow me to mark all items as completed', async ({ page }) => {
        // Complete all todos.
        await page.locator('.toggle-all').check();
        // Ensure all todos have 'completed' class.
        await (0, test_1.expect)(page.locator('.todo-list li')).toHaveClass(['completed', 'completed', 'completed']);
        await checkNumberOfCompletedTodosInLocalStorage(page, 3);
    });
    (0, test_1.test)('should allow me to clear the complete state of all items', async ({ page }) => {
        // Check and then immediately uncheck.
        await page.locator('.toggle-all').check();
        await page.locator('.toggle-all').uncheck();
        // Should be no completed classes.
        await (0, test_1.expect)(page.locator('.todo-list li')).toHaveClass(['', '', '']);
    });
    (0, test_1.test)('complete all checkbox should update state when items are completed / cleared', async ({ page }) => {
        const toggleAll = page.locator('.toggle-all');
        await toggleAll.check();
        await (0, test_1.expect)(toggleAll).toBeChecked();
        await checkNumberOfCompletedTodosInLocalStorage(page, 3);
        // Uncheck first todo.
        const firstTodo = page.locator('.todo-list li').nth(0);
        await firstTodo.locator('.toggle').uncheck();
        // Reuse toggleAll locator and make sure its not checked.
        await (0, test_1.expect)(toggleAll).not.toBeChecked();
        await firstTodo.locator('.toggle').check();
        await checkNumberOfCompletedTodosInLocalStorage(page, 3);
        // Assert the toggle all is checked again.
        await (0, test_1.expect)(toggleAll).toBeChecked();
    });
});
test_1.test.describe('Item', () => {
    (0, test_1.test)('should allow me to mark items as complete', async ({ page }) => {
        // Create two items.
        for (const item of TODO_ITEMS.slice(0, 2)) {
            await page.locator('.new-todo').fill(item);
            await page.locator('.new-todo').press('Enter');
        }
        // Check first item.
        const firstTodo = page.locator('.todo-list li').nth(0);
        await firstTodo.locator('.toggle').check();
        await (0, test_1.expect)(firstTodo).toHaveClass('completed');
        // Check second item.
        const secondTodo = page.locator('.todo-list li').nth(1);
        await (0, test_1.expect)(secondTodo).not.toHaveClass('completed');
        await secondTodo.locator('.toggle').check();
        // Assert completed class.
        await (0, test_1.expect)(firstTodo).toHaveClass('completed');
        await (0, test_1.expect)(secondTodo).toHaveClass('completed');
    });
    (0, test_1.test)('should allow me to un-mark items as complete', async ({ page }) => {
        // Create two items.
        for (const item of TODO_ITEMS.slice(0, 2)) {
            await page.locator('.new-todo').fill(item);
            await page.locator('.new-todo').press('Enter');
        }
        const firstTodo = page.locator('.todo-list li').nth(0);
        const secondTodo = page.locator('.todo-list li').nth(1);
        await firstTodo.locator('.toggle').check();
        await (0, test_1.expect)(firstTodo).toHaveClass('completed');
        await (0, test_1.expect)(secondTodo).not.toHaveClass('completed');
        await checkNumberOfCompletedTodosInLocalStorage(page, 1);
        await firstTodo.locator('.toggle').uncheck();
        await (0, test_1.expect)(firstTodo).not.toHaveClass('completed');
        await (0, test_1.expect)(secondTodo).not.toHaveClass('completed');
        await checkNumberOfCompletedTodosInLocalStorage(page, 0);
    });
    (0, test_1.test)('should allow me to edit an item', async ({ page }) => {
        await createDefaultTodos(page);
        const todoItems = page.locator('.todo-list li');
        const secondTodo = todoItems.nth(1);
        await secondTodo.dblclick();
        await (0, test_1.expect)(secondTodo.locator('.edit')).toHaveValue(TODO_ITEMS[1]);
        await secondTodo.locator('.edit').fill('buy some sausages');
        await secondTodo.locator('.edit').press('Enter');
        // Explicitly assert the new text value.
        await (0, test_1.expect)(todoItems).toHaveText([
            TODO_ITEMS[0],
            'buy some sausages',
            TODO_ITEMS[2]
        ]);
        await checkTodosInLocalStorage(page, 'buy some sausages');
    });
});
test_1.test.describe('Editing', () => {
    test_1.test.beforeEach(async ({ page }) => {
        await createDefaultTodos(page);
        await checkNumberOfTodosInLocalStorage(page, 3);
    });
    (0, test_1.test)('should hide other controls when editing', async ({ page }) => {
        const todoItem = page.locator('.todo-list li').nth(1);
        await todoItem.dblclick();
        await (0, test_1.expect)(todoItem.locator('.toggle')).not.toBeVisible();
        await (0, test_1.expect)(todoItem.locator('label')).not.toBeVisible();
        await checkNumberOfTodosInLocalStorage(page, 3);
    });
    (0, test_1.test)('should save edits on blur', async ({ page }) => {
        const todoItems = page.locator('.todo-list li');
        await todoItems.nth(1).dblclick();
        await todoItems.nth(1).locator('.edit').fill('buy some sausages');
        await todoItems.nth(1).locator('.edit').dispatchEvent('blur');
        await (0, test_1.expect)(todoItems).toHaveText([
            TODO_ITEMS[0],
            'buy some sausages',
            TODO_ITEMS[2],
        ]);
        await checkTodosInLocalStorage(page, 'buy some sausages');
    });
    (0, test_1.test)('should trim entered text', async ({ page }) => {
        const todoItems = page.locator('.todo-list li');
        await todoItems.nth(1).dblclick();
        await todoItems.nth(1).locator('.edit').fill('    buy some sausages    ');
        await todoItems.nth(1).locator('.edit').press('Enter');
        await (0, test_1.expect)(todoItems).toHaveText([
            TODO_ITEMS[0],
            'buy some sausages',
            TODO_ITEMS[2],
        ]);
        await checkTodosInLocalStorage(page, 'buy some sausages');
    });
    (0, test_1.test)('should remove the item if an empty text string was entered', async ({ page }) => {
        const todoItems = page.locator('.todo-list li');
        await todoItems.nth(1).dblclick();
        await todoItems.nth(1).locator('.edit').fill('');
        await todoItems.nth(1).locator('.edit').press('Enter');
        await (0, test_1.expect)(todoItems).toHaveText([
            TODO_ITEMS[0],
            TODO_ITEMS[2],
        ]);
    });
    (0, test_1.test)('should cancel edits on escape', async ({ page }) => {
        const todoItems = page.locator('.todo-list li');
        await todoItems.nth(1).dblclick();
        await todoItems.nth(1).locator('.edit').press('Escape');
        await (0, test_1.expect)(todoItems).toHaveText(TODO_ITEMS);
    });
});
test_1.test.describe('Counter', () => {
    (0, test_1.test)('should display the current number of todo items', async ({ page }) => {
        await page.locator('.new-todo').fill(TODO_ITEMS[0]);
        await page.locator('.new-todo').press('Enter');
        await (0, test_1.expect)(page.locator('.todo-count')).toContainText('1');
        await page.locator('.new-todo').fill(TODO_ITEMS[1]);
        await page.locator('.new-todo').press('Enter');
        await (0, test_1.expect)(page.locator('.todo-count')).toContainText('2');
        await checkNumberOfTodosInLocalStorage(page, 2);
    });
});
test_1.test.describe('Clear completed button', () => {
    test_1.test.beforeEach(async ({ page }) => {
        await createDefaultTodos(page);
    });
    (0, test_1.test)('should display the correct text', async ({ page }) => {
        await page.locator('.todo-list li .toggle').first().check();
        await (0, test_1.expect)(page.locator('.clear-completed')).toHaveText('Clear completed');
    });
    (0, test_1.test)('should remove completed items when clicked', async ({ page }) => {
        const todoItems = page.locator('.todo-list li');
        await todoItems.nth(1).locator('.toggle').check();
        await page.locator('.clear-completed').click();
        await (0, test_1.expect)(todoItems).toHaveCount(2);
        await (0, test_1.expect)(todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[2]]);
    });
    (0, test_1.test)('should be hidden when there are no items that are completed', async ({ page }) => {
        await page.locator('.todo-list li .toggle').first().check();
        await page.locator('.clear-completed').click();
        await (0, test_1.expect)(page.locator('.clear-completed')).toBeHidden();
    });
});
test_1.test.describe('Persistence', () => {
    (0, test_1.test)('should persist its data', async ({ page }) => {
        for (const item of TODO_ITEMS.slice(0, 2)) {
            await page.locator('.new-todo').fill(item);
            await page.locator('.new-todo').press('Enter');
        }
        const todoItems = page.locator('.todo-list li');
        await todoItems.nth(0).locator('.toggle').check();
        await (0, test_1.expect)(todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[1]]);
        await (0, test_1.expect)(todoItems).toHaveClass(['completed', '']);
        // Ensure there is 1 completed item.
        checkNumberOfCompletedTodosInLocalStorage(page, 1);
        // Now reload.
        await page.reload();
        await (0, test_1.expect)(todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[1]]);
        await (0, test_1.expect)(todoItems).toHaveClass(['completed', '']);
    });
});
test_1.test.describe('Routing', () => {
    test_1.test.beforeEach(async ({ page }) => {
        await createDefaultTodos(page);
        // make sure the app had a chance to save updated todos in storage
        // before navigating to a new view, otherwise the items can get lost :(
        // in some frameworks like Durandal
        await checkTodosInLocalStorage(page, TODO_ITEMS[0]);
    });
    (0, test_1.test)('should allow me to display active items', async ({ page }) => {
        await page.locator('.todo-list li .toggle').nth(1).check();
        await checkNumberOfCompletedTodosInLocalStorage(page, 1);
        await page.locator('.filters >> text=Active').click();
        await (0, test_1.expect)(page.locator('.todo-list li')).toHaveCount(2);
        await (0, test_1.expect)(page.locator('.todo-list li')).toHaveText([TODO_ITEMS[0], TODO_ITEMS[2]]);
    });
    (0, test_1.test)('should respect the back button', async ({ page }) => {
        await page.locator('.todo-list li .toggle').nth(1).check();
        await checkNumberOfCompletedTodosInLocalStorage(page, 1);
        await test_1.test.step('Showing all items', async () => {
            await page.locator('.filters >> text=All').click();
            await (0, test_1.expect)(page.locator('.todo-list li')).toHaveCount(3);
        });
        await test_1.test.step('Showing active items', async () => {
            await page.locator('.filters >> text=Active').click();
        });
        await test_1.test.step('Showing completed items', async () => {
            await page.locator('.filters >> text=Completed').click();
        });
        await (0, test_1.expect)(page.locator('.todo-list li')).toHaveCount(1);
        await page.goBack();
        await (0, test_1.expect)(page.locator('.todo-list li')).toHaveCount(2);
        await page.goBack();
        await (0, test_1.expect)(page.locator('.todo-list li')).toHaveCount(3);
    });
    (0, test_1.test)('should allow me to display completed items', async ({ page }) => {
        await page.locator('.todo-list li .toggle').nth(1).check();
        await checkNumberOfCompletedTodosInLocalStorage(page, 1);
        await page.locator('.filters >> text=Completed').click();
        await (0, test_1.expect)(page.locator('.todo-list li')).toHaveCount(1);
    });
    (0, test_1.test)('should allow me to display all items', async ({ page }) => {
        await page.locator('.todo-list li .toggle').nth(1).check();
        await checkNumberOfCompletedTodosInLocalStorage(page, 1);
        await page.locator('.filters >> text=Active').click();
        await page.locator('.filters >> text=Completed').click();
        await page.locator('.filters >> text=All').click();
        await (0, test_1.expect)(page.locator('.todo-list li')).toHaveCount(3);
    });
    (0, test_1.test)('should highlight the currently applied filter', async ({ page }) => {
        await (0, test_1.expect)(page.locator('.filters >> text=All')).toHaveClass('selected');
        await page.locator('.filters >> text=Active').click();
        // Page change - active items.
        await (0, test_1.expect)(page.locator('.filters >> text=Active')).toHaveClass('selected');
        await page.locator('.filters >> text=Completed').click();
        // Page change - completed items.
        await (0, test_1.expect)(page.locator('.filters >> text=Completed')).toHaveClass('selected');
    });
});
async function createDefaultTodos(page) {
    for (const item of TODO_ITEMS) {
        await page.locator('.new-todo').fill(item);
        await page.locator('.new-todo').press('Enter');
    }
}
async function checkNumberOfTodosInLocalStorage(page, expected) {
    return await page.waitForFunction(e => {
        return JSON.parse(localStorage['react-todos']).length === e;
    }, expected);
}
async function checkNumberOfCompletedTodosInLocalStorage(page, expected) {
    return await page.waitForFunction(e => {
        return JSON.parse(localStorage['react-todos']).filter((todo) => todo.completed).length === e;
    }, expected);
}
async function checkTodosInLocalStorage(page, title) {
    return await page.waitForFunction(t => {
        return JSON.parse(localStorage['react-todos']).map((todo) => todo.title).includes(t);
    }, title);
}
//# sourceMappingURL=demo-todo-app.spec.js.map