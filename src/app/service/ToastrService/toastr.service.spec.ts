import { TestBed } from '@angular/core/testing';

import { MyToastrService } from './toastr.service';

describe('ToastrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyToastrService = TestBed.get(MyToastrService);
    expect(service).toBeTruthy();
  });
});
