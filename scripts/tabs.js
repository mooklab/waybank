class Tabs {

    constructor(section, captions, contents) {
        this.section = section
        this.captions = captions
        this.contents = contents

        this.captions.forEach( (caption, index) => {
            caption.addEventListener('click', event => {
                this.resetAll()
                this.onClick(index)
            })
        })
    }

    onClick(index) {
        this.captions[index].classList.add('opened')
        this.contents[index].classList.add('opened')
    }

    resetAll(){
        this.captions.forEach( caption => caption.classList.remove('opened'))
        this.contents.forEach( content => content.classList.remove('opened'))
    }

}

tabsSections = document.querySelectorAll('div.tabs')
tabsSections.forEach( tabSection => {
    captions = tabSection.querySelectorAll('.tab_caption')
    contents = tabSection.querySelectorAll('.tab_content')
    tab = new Tabs(tabSection, captions, contents)
})