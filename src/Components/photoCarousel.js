import React, { Component } from 'react'
import {FormattedMessage} from 'react-intl'


class PhotoCarousel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            photoIndex: 0,
        }

        this.interval = null
        this.carouselImages = props.carouselImages

        this.leftArrow = this.leftArrow.bind(this)
        this.rightArrow = this.rightArrow.bind(this)
        this.goToStart = this.goToStart.bind(this)
        this.goToEnd = this.goToEnd.bind(this)
    }

    leftArrow() {
        const { photoIndex } = this.state

        if (photoIndex > 0) {
            document.getElementById(`${this.carouselImages[photoIndex].url}`).style.opacity = '0'
            document.getElementById(`${this.carouselImages[photoIndex - 1].url}`).style.opacity = '1'
            document.getElementById(`${this.carouselImages[photoIndex].url}`).style.zIndex = '1'
            document.getElementById(`${this.carouselImages[photoIndex - 1].url}`).style.zIndex = '2'
            this.setState({ photoIndex: photoIndex - 1 })
        } else {
            this.goToEnd()
        }
    }

    rightArrow() {
        const { photoIndex } = this.state

        if (photoIndex < this.carouselImages.length - 1) {
            document.getElementById(`${this.carouselImages[photoIndex].url}`).style.opacity = '0'
            document.getElementById(`${this.carouselImages[photoIndex + 1].url}`).style.opacity = '1'
            document.getElementById(`${this.carouselImages[photoIndex].url}`).style.zIndex = '1'
            document.getElementById(`${this.carouselImages[photoIndex + 1].url}`).style.zIndex = '2'
            this.setState({ photoIndex: photoIndex + 1 })
        } else {
            this.goToStart()
        }
    }

    goToStart() {
        const { photoIndex } = this.state

        document.getElementById(`${this.carouselImages[photoIndex].url}`).style.opacity = '0'
        document.getElementById(`${this.carouselImages[0].url}`).style.opacity = '1'
        document.getElementById(`${this.carouselImages[photoIndex].url}`).style.zIndex = '1'
        document.getElementById(`${this.carouselImages[0].url}`).style.zIndex = '2'
        this.setState({ photoIndex: 0 })
    }

    goToEnd() {
        const { photoIndex } = this.state
        const { carouselImages } = this

        document.getElementById(`${this.carouselImages[photoIndex].url}`).style.opacity = '0'
        document.getElementById(`${this.carouselImages[this.carouselImages.length - 1].url}`).style.opacity = '1'
        document.getElementById(`${this.carouselImages[photoIndex].url}`).style.zIndex = '1'
        document.getElementById(`${this.carouselImages[this.carouselImages.length - 1].url}`).style.zIndex = '2'
        this.setState({ photoIndex: carouselImages.length - 1 })
    }

    componentDidMount() {
        if (document.getElementById(`${this.carouselImages[0].url}`)) {
            document.getElementById(`${this.carouselImages[0].url}`).style.zIndex = 2
            document.getElementById(`${this.carouselImages[0].url}`).style.opacity = 1
            this.interval = setInterval(this.rightArrow, 15000)
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {

        return (
            <span id="photo-carousel">
                <span className='category-title'>{this.props.title!=''?<FormattedMessage id={this.props.title}/>:''}</span>
                <div className="photo-container">
                    <span id="ca-le-arr" className="workshop-page-arrow" onClick={this.leftArrow} />
                    {this.carouselImages.map((each) => {
                        return (
                            <div
                                className="each-container"
                                style={{ opacity: 0, zIndex: 1 }}
                                key={this.carouselImages.indexOf(each)}
                                id={each.url}
                            >
                                <img id="carousel-photo" src={each.url} onClick={this.props.click?()=>this.props.click(each.index):()=>{}}/>
                                <span id="photo-name">{each.tag}</span>
                            </div>
                        )
                    })}
                    <span id="ca-ri-arr" className="workshop-page-arrow" onClick={this.rightArrow} />
                </div>
            </span>
        )
    }
}

export default PhotoCarousel