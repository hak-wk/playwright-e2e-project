import { test, expect } from "@playwright/test";
import { Header } from "../../pages/components/Header";
import { LoginPage } from "../../pages/LoginPage";
import { RoomsPage } from "../../pages/RoomsPage";
import { rooms, invalidRooms, getRoomDetails } from '../../data/rooms';

test.describe('Room Tests', () => {
    let header: Header;
    let loginPage: LoginPage;
    let roomsPage: RoomsPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        header = new Header(page);
        roomsPage = new RoomsPage(page);

        await loginPage.goto();
        await loginPage.login('admin', 'password');
        await expect(roomsPage.createRoomButton).toBeVisible();
    });

    // CREATING ROOM WITH DIFFERENT ROOM TYPES
    test.describe("ADMIN MUST ABLE TO CREATE ROOM WITH DIFFERENT ROOM TYPES", () => {
        for (const room of rooms) {
            test(`Room : ${room[0]}, Type: ${room[1]} @sanity @admin`, async ({ page }) => {
                const name = room[0];
                const type = room[1];
                const accessible = room[2];
                const price = room[3];
                const amenities = room[4];
                await roomsPage.createRoom(name, type, accessible, price, amenities);
            
                const accessibleString = accessible.toString();
                const priceString = price.toString();
                const amenitiesString = getRoomDetails(amenities);
                // ASSERTION OF THE CREATED ROOM
                const roomRecord = page.locator(`//div[@data-testid='roomlisting'][.//p[contains(@id,'${name}')]]`).last();
                await expect(roomRecord, `Room ${name} is created!`).toBeVisible();
                await expect(roomRecord.locator('p[id*=roomName]'), `Room ${name} has correct name: ${name}`).toContainText(name);
                await expect(roomRecord.locator('p[id*=type]'), `Room ${name} has correct type: ${type}`).toContainText(type);
                await expect(roomRecord.locator('p[id*=accessible]'), `Room ${name} has correct accessibility: ${accessibleString}`).toContainText(accessibleString);
                await expect(roomRecord.locator('p[id*=roomPrice]'), `Room ${name} has correct price: ${priceString}`).toContainText(priceString);
                await expect(roomRecord.locator('p[id*=details]'), `Room ${name} has correct details: ${amenitiesString}`).toContainText(amenitiesString);
                // Clear Data
                await roomRecord.locator('.fa-remove.roomDelete').click();
                await expect(roomRecord).not.toBeVisible();
            });
        }
    });

    // CREATING INVALID ROOM
    test.describe("ADMIN CANNOT CREATE THESE INVALID ROOMS", () => {
        for (const room of invalidRooms) {
            test(`if ${room[5]} @admin`, async () => {
                const name = room[0];
                const type = room[1];
                const accessible = room[2];
                const price = room[3];
                const amenities = room[4];
                const errorMessage = room[6];
                await roomsPage.createRoom(name, type, accessible, price, amenities);
    
                await expect(roomsPage.errorMessages, 'Error messages are displayed').toBeVisible();
                await expect(roomsPage.errorMessages, `Error message '${errorMessage}' is displayed`).toContainText(errorMessage);
            });
        }
    });

});
