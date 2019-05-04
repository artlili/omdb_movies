// import `.scss` files
import './scss/styles.scss'

let movieList = document.getElementById('movies')
let randomMovies = ['Star Wars', 'Game of Thrones', 'Lord of the Rings', 'Harry Potter']

document.querySelector('.select').onclick = function(event) {
  this.classList.toggle('open')
  if(event.target.className == 'select-list') {
    let selectThis = event.target.textContent || event.target.innerText
    this.querySelector('.input').value = selectThis
  }

}

document.getElementById('title').onchange = function() {
  if(title) {
    let button = document.getElementById('search-button')
    button.disabled = false
  }
}

function addMovieToList(movie) {
  let link = document.createElement('a')
  link.className = 'movie'
  link.href = `https://www.imdb.com/title/${movie.imdbID}`
  link.style = `background-image: url(${movie.Poster})`
  movieList.appendChild(link)
}

function getData(url) {
  return new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.onload = function() {
      if (xhr.status === 200) {
        let json = JSON.parse(xhr.response)
        resolve(json.Search)
      } else {
        reject(xhr.statusText)
      }
    }

    xhr.onerror = function (error) {
      reject(error)
    }

    xhr.send()
  })

}
function getRandomMovies() {
  movieList.innerHTML = ''

  for (let randomMovie of randomMovies) {

    getData(`http://www.omdbapi.com/?s=${randomMovie}&apikey=e0482e89`)
    .then(movies =>
      movies.forEach(movie =>
          addMovieToList(movie)
      )
    )
    .catch(error => {
      movieList.innerHTML = '<p>No results matching</p>'
    })
  }

}


document.getElementById('reset-button').onclick = function() {
  getRandomMovies()
}
document.getElementById('search-button').onclick = function() {
  console.clear()
  let title = document.getElementById('title').value
  let year = document.getElementById('year').value
  let type = document.getElementById('type').value

  movieList.innerHTML = ''

  getData(`http://www.omdbapi.com/?s=${title}&y=${year}&apikey=e0482e89`)
    .then(movies =>
      movies.forEach(movie =>
        addMovieToList(movie)
      )
    )
    .catch(error => {
      movieList.innerHTML = '<p>No results matching</p>'
    })


}

document.addEventListener("DOMContentLoaded", getRandomMovies)
