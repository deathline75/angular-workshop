import { TestBed, inject } from '@angular/core/testing';

import { DadJokeService } from './dad-joke.service';

describe('DadJokeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DadJokeService]
    });
  });

  it('should be created', inject([DadJokeService], (service: DadJokeService) => {
    expect(service).toBeTruthy();
  }));
});
