const observer = new IntersectionObserver( entries => {
    entries.forEach( entry => {
        entry.isIntersecting ? entry.target.classList.add('start') : entry.target.classList.remove('start')
    })
})

var animateElements = document.querySelectorAll('.animate')
animateElements.forEach( element => observer.observe(element))
