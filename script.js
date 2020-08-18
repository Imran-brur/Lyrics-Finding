const searchBtn = document.querySelector('.search-btn');
searchBtn.addEventListener('click', function(){
    const searchBox = document.getElementById('searchBox');
    getResults(searchBox.value);
    searchBox.value = "";
    document.querySelector('#lyricList').innerHTML = "";
    document.querySelector('.single-lyrics').innerHTML = "";


})

function getResults(querySong){
    fetch('https://api.lyrics.ovh' + '/suggest/' + querySong)
    .then(res => {
        return res.json();
    })
    .then(displayResults)
}

 function displayResults(data) { 
    // console.log(data);
   for (let i = 0; i < 10; i++) {
    var titleName = data.data[i].title;
    var artistName = data.data[i].artist.name;

    var html = `
    <div class="song-list">
    <h3 class="lyrics-name">${ data.data[i].title}</h3>
    <p class="artist-name">  Album by <span>${data.data[i].artist.name}</span></p>
    </div>
    <div id="lyricBtn">
    <button class="btn btn-success" onclick="getLyrics('${data.data[i].artist.name}','${data.data[i].title}')">Get Lyrics</button>
    </div>
    `
    document.querySelector('#lyricList').innerHTML += html;
   } 
}

     // lyrics-Part

       function getLyrics(artistName,titleName){
        fetch(`https://api.lyrics.ovh/v1/${artistName}/${titleName}`)
        .then(res => res.json())
        .then(data => {
          //  console.log(data);
            var lyrics = data.lyrics;
            //console.log(lyrics);
            var lyricsHtml = `
            <div class="single-lyrics text-center">
                <h2 class="text-success mb-4">${titleName}</h2>
                <pre class="lyric text-white">${lyrics}</pre>
            </div>
            `
            document.querySelector('.single-lyrics').innerHTML = lyricsHtml;
           
        });
   }