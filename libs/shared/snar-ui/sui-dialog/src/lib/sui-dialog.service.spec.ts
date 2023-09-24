import { TestBed } from '@angular/core/testing';

import { SuiDialogService } from './sui-dialog.service';
import { Dialog, DialogModule } from '@angular/cdk/dialog';

describe('SuiDialogService', () => {
  let service: SuiDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DialogModule],
    });
    TestBed.inject(Dialog);
    service = TestBed.inject(SuiDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
