# Word embeddings for Subtitles

- I'm currently using subtitles data of *Friends*.

### Tasks
- POS tagging for recognizing actors
  - need more processing than naive POS tagging
- Gensim Word2Vec   
  - `model=Word2Vec(sentences)`     
    - `model.init_sims(replace=True)`       
      - Remove useless memory (memory optimization)   
  - `model.most_similar('Apple')`     
    - Retrieve most similar words to 'Apple'.

### Data
- Friends subtitles (Season 1-10)
  - [http://www.subscene.co.in/tv-shows/friends-subtitles.html](http://www.subscene.co.in/tv-shows/friends-subtitles.html)
  - Season 2, 3, 4, 5, 8, 9 -> SUB file (.sub)
  - Season 1, 6, 7, 10 -> SRT file (.srt)

## Word2Vec Results
- <img src="./results/img/Most-related-to-Ross.PNG" width="400">
