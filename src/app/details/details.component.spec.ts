import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { ReactiveFormsModule } from '@angular/forms';
import {DetailsComponent} from "./details.component";

const mockLocation: HousingLocation = {
    id: 1,
    name: 'Test Location',
    city: 'Test City',
    state: 'Test State',
    photo: 'test.jpg',
    availableUnits: 5,
    wifi: true,
    laundry: false
};

const housingServiceMock = {
    getAllHousingLocationById: jest.fn().mockResolvedValue(mockLocation),
    submitApplication: jest.fn()
};

const activatedRouteMock = {
    snapshot: {
        params: { id: 1 }
    }
};

describe('DetailsComponent', () => {
    let component: DetailsComponent;
    let fixture: ComponentFixture<DetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DetailsComponent, ReactiveFormsModule],
            providers: [
                { provide: ActivatedRoute, useValue: activatedRouteMock },
                { provide: HousingService, useValue: housingServiceMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(DetailsComponent);
        component = fixture.componentInstance;
    });

    it('should fetch housing location on init', async () => {
        // given
        const expectedId = 1;

        // when
        await fixture.whenStable();
        fixture.detectChanges();

        // then
        expect(housingServiceMock.getAllHousingLocationById).toHaveBeenCalledWith(expectedId);
        expect(component.housingLocation).toEqual(mockLocation);
    });

    it('should call submitApplication with form values', async () => {
        // given
        await fixture.whenStable();
        fixture.detectChanges();
        component.applyForm.setValue({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com'
        });

        // when
        component.submitApplication();

        // then
        expect(housingServiceMock.submitApplication).toHaveBeenCalledWith(
            'John',
            'Doe',
            'john@example.com'
        );
    });

    it('should render housing location name in template', async () => {
        // when
        await fixture.whenStable();
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        const heading = compiled.querySelector('.listing-heading');

        // then
        expect(heading?.textContent).toContain('Test Location');
    });

    it('should have apply button', async () => {
        // given
        await fixture.whenStable();
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        const button = compiled.querySelector('.primary');

        // then
        expect(button?.textContent).toContain('Apply now');
    });
});
