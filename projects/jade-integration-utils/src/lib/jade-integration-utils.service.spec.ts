import { TestBed } from '@angular/core/testing';

import { JadeIntegrationUtilsService } from './jade-integration-utils.service';

describe('JadeIntegrationUtilsService', () => {
  let service: JadeIntegrationUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JadeIntegrationUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
