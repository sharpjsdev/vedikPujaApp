import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare const YT: any;

@Component({
  selector: 'app-puja-live',
  templateUrl: './puja-live.page.html',
  styleUrls: ['./puja-live.page.scss'],
})
export class PujaLivePage implements OnInit {
  
  @ViewChild('youtubePlayer', { static: true }) playerElement!: ElementRef;

  link:any;
  youtubeVideoId: any;
  player: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    
  }
  ionViewDidEnter(){
  
    this.youtubeVideoId = this.route.snapshot.paramMap.get('id');
    this.createPlayer();
  }
  createPlayer() {
    const videoId = this.route.snapshot.paramMap.get('id');

    this.player = new YT.Player(this.playerElement.nativeElement, {
      height: '315',
      width: '100%',
      videoId: this.youtubeVideoId,
      events: {
        'onReady': this.onPlayerReady.bind(this),
        'onStateChange': this.onPlayerStateChange.bind(this),
      },
    });
  }


  onPlayerReady(event:any) {
    // Player is ready
  }

  onPlayerStateChange(event:any) {
    if (event.data === YT.PlayerState.PLAYING) {
      // Now that the player is playing, we can attempt to hide the "More" button
      this.hideMoreButton();
    }
  }

  hideMoreButton() {
    // Get the iframe
    const iframe = this.player?.getIframe();

    // Check if the iframe and its contentDocument exist
    if (iframe && iframe.contentDocument) {
      // Try to hide the "More" button
      const moreButton = iframe.contentDocument.querySelector('.ytp-overflow-button');

      if (moreButton) {
        moreButton.style.display = 'none';
      }
    }
  }
}
