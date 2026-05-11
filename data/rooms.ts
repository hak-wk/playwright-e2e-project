export enum RoomType {
    SINGLE = 'Single',
    TWIN = 'Twin',
    DOUBLE = 'Double',
    FAMILY = 'Family',
    SUITE = 'Suite'
}
  
export type RoomAmenities = {
    wifi: boolean;
    tv: boolean;
    radio: boolean;
    refreshments: boolean;
    safe: boolean;
    views: boolean;
};

export const rooms: [string, RoomType, boolean, number, RoomAmenities][] = [
    ['114', RoomType.SINGLE, false, 80, { wifi: false, tv: false, radio: false, refreshments: false, safe: false, views: false }],
    ['115', RoomType.TWIN, false, 150, { wifi: true, tv: true, radio: false, refreshments: false, safe: true, views: false }],
    ['116', RoomType.DOUBLE, true, 200, { wifi: true, tv: true, radio: false, refreshments: true, safe: true, views: false }],
    ['117', RoomType.FAMILY, true, 250, { wifi: true, tv: true, radio: true, refreshments: true, safe: true, views: true }],
    ['118', RoomType.SUITE, true, 300, { wifi: true, tv: true, radio: true, refreshments: true, safe: true, views: true }]
];

export const invalidRooms: [string, RoomType, boolean, number | null, RoomAmenities, string, string][] = [
    ['', RoomType.SINGLE, false, 80, { wifi: false, tv: false, radio: false, refreshments: false, safe: false, views: false }, "Room name is empty", "Room name must be set"],
    ['303', RoomType.TWIN, false, 0, { wifi: true, tv: true, radio: false, refreshments: false, safe: true, views: false }, "Room price is empty", "must be greater than or equal to 1"],
    ['303', RoomType.TWIN, false, null, { wifi: true, tv: true, radio: false, refreshments: false, safe: true, views: false }, "Room price is 0", "Failed to create room"]
];

export function getAmenitiesAsList(roomAmenities:RoomAmenities) {
    const amenitiesList: string[] = [];

    if (roomAmenities.wifi) amenitiesList.push('WiFi');
    if (roomAmenities.tv) amenitiesList.push('TV');
    if (roomAmenities.radio) amenitiesList.push('Radio');
    if (roomAmenities.refreshments) amenitiesList.push('Refreshments');
    if (roomAmenities.safe) amenitiesList.push('Safe');
    if (roomAmenities.views) amenitiesList.push('Views');

    return amenitiesList;
}

export function getRoomDetails(roomAmenities: RoomAmenities) {
    const amenitiesList: string[] = getAmenitiesAsList(roomAmenities);

    return amenitiesList.length == 0 ? 'No features added to the room' : amenitiesList.join(', ');
}