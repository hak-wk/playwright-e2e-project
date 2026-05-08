import { test, Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { RoomAmenities, RoomType } from "../data/rooms";

export class RoomsPage extends BasePage {
    readonly roomNameField: Locator;
    readonly roomTypeSelect: Locator;
    readonly roomAccessibleSelect: Locator;
    readonly roomPriceField: Locator;
    readonly wifiCheckbox: Locator;
    readonly tvCheckbox: Locator;
    readonly radioCheckbox: Locator;
    readonly refreshmentsCheckbox: Locator;
    readonly safeCheckbox: Locator;
    readonly viewsCheckbox: Locator;
    readonly createRoomButton: Locator;
    readonly errorMessages: Locator;

    constructor(page: Page) {
        super(page);

        this.roomNameField = page.getByTestId('roomName');
        this.roomTypeSelect = page.locator('#type');
        this.roomAccessibleSelect = page.locator('#accessible');
        this.roomPriceField = page.locator('#roomPrice');
        this.wifiCheckbox = page.locator('#wifiCheckbox');
        this.tvCheckbox = page.locator('#tvCheckbox');
        this.radioCheckbox = page.locator('#radioCheckbox');
        this.refreshmentsCheckbox = page.locator('#refreshCheckbox');
        this.safeCheckbox = page.locator('#safeCheckbox');
        this.viewsCheckbox = page.locator('#viewsCheckbox');
        this.createRoomButton = page.locator('#createRoom');
        this.errorMessages = page.locator('.alert.alert-danger');
    }

    async goto() {
        await test.step('Go to Rooms Page', async () => {
            await this.page.goto('/admin/rooms');
        });
    }

    async selectRoomType(type: RoomType | null) {
        if (type != null) await this.roomTypeSelect.selectOption(type);
    }

    async enterPrice(price: number | null) {
        if (price != null) await this.roomPriceField.fill(price.toString());
    }

    async selectAmenities(amenities: RoomAmenities) {
        if (amenities.wifi) await this.wifiCheckbox.check();
        else await this.wifiCheckbox.uncheck();
        if (amenities.tv) await this.tvCheckbox.check();
        else await this.tvCheckbox.uncheck();
        if (amenities.radio) await this.radioCheckbox.check();
        else await this.radioCheckbox.uncheck();
        if (amenities.refreshments) await this.refreshmentsCheckbox.check();
        else await this.refreshmentsCheckbox.uncheck();
        if (amenities.safe) await this.safeCheckbox.check();
        else await this.safeCheckbox.uncheck();
        if (amenities.views) await this.viewsCheckbox.check();
        else await this.viewsCheckbox.uncheck();
    }

    async getAmenitiesAsList(roomAmenities:RoomAmenities) {
        const amenitiesList: string[] = [];

        if (roomAmenities.wifi) amenitiesList.push('WiFi');
        if (roomAmenities.tv) amenitiesList.push('TV');
        if (roomAmenities.radio) amenitiesList.push('Radio');
        if (roomAmenities.refreshments) amenitiesList.push('Refreshments');
        if (roomAmenities.safe) amenitiesList.push('Safe');
        if (roomAmenities.views) amenitiesList.push('Views');

        return amenitiesList;
    }

    async getRoomDetails(roomAmenities: RoomAmenities) {
        const amenitiesList: string[] = await this.getAmenitiesAsList(roomAmenities);

        return amenitiesList.length == 0 ? 'No features added to the room' : amenitiesList.join(', ');
    }

    async createRoom(roomName: string, roomType: RoomType | null, roomIsAccessible: boolean, roomPrice: number | null, roomAmenities: RoomAmenities) {
        await test.step(`Create ${roomType} Room with name '${roomName}'`, async () => {
            await this.roomNameField.fill(roomName);
            await this.selectRoomType(roomType);
            await this.roomAccessibleSelect.selectOption(roomIsAccessible ? 'true' : 'false');
            await this.enterPrice(roomPrice);
            await this.selectAmenities(roomAmenities);
            await this.createRoomButton.click();
        });
    }

}