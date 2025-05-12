import { HousingService } from './housing.service';
import { HousingLocation } from './housing-location';

global.fetch = jest.fn();

describe('HousingService', () => {
    let service: HousingService;

    beforeEach(() => {
        service = new HousingService();
        jest.clearAllMocks();
    });

    it('should fetch all housing locations', async () => {
        // given
        const mockData: HousingLocation[] = [
            { id: 1, name: 'Location 1', city: 'City A', state: 'State A', photo: '', availableUnits: 1, wifi: true, laundry: false },
            { id: 2, name: 'Location 2', city: 'City B', state: 'State B', photo: '', availableUnits: 2, wifi: false, laundry: true }
        ];

        (fetch as jest.Mock).mockResolvedValue({
            json: async () => mockData
        });

        // when
        const locations = await service.getAllHousingLocations();

        //then
        expect(fetch).toHaveBeenCalledWith('http://localhost:3000/locations');
        expect(locations.length).toBe(2);
        expect(locations[0]).toEqual(mockData[0]);
        expect(locations[1]).toEqual(mockData[1]);
    });

    it('should fetch housing location by ID', async () => {
        // given
        const mockItem: HousingLocation = {
            id: 3,
            name: 'Location 3',
            city: 'City C',
            state: 'State C',
            photo: '',
            availableUnits: 3,
            wifi: true,
            laundry: true
        };

        (fetch as jest.Mock).mockResolvedValue({
            json: async () => mockItem
        });

        // when
        const location = await service.getAllHousingLocationById(3);

        // then
        expect(fetch).toHaveBeenCalledWith('http://localhost:3000/locations/3');
        expect(location?.id).toEqual(3);
    });
});
