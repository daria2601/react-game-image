import React from 'react';

class GameField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: []
        };
        this.selectedCards = [];
        this.timeout = null;
        this.twoSecondsTimeout = null;
        this.countOpen = null;
        this.audioClick = new Audio("/sounds/clickGameField.mp3");
        this.sameCards = new Audio("/sounds/SameCards.mp3");
        this.disabled = false;
    }

    componentDidMount() {
        this.getFieldsContent(this.props.countFields);
        this.hideInTime();
    }

    componentWillUpdate(newProps) {
        if (newProps.countFields !== this.props.countFields) {
            this.getFieldsContent(newProps.countFields);
            this.showAll();
            this.selectedCards = [];
            this.countOpen = null;
            this.hideInTime();
        }
    }

    hideInTime = () => {
        this.twoSecondsTimeout = setTimeout(() => {
            this.hideAll();
        }, 2000);
    };

    hideAll = () => {
        document.getElementById("gameField").childNodes.forEach((element) => {
            element.classList.remove('openedItems');
        });
        this.disabled = false;
    };

    showAll = () => {
        this.disabled = true;
        clearTimeout(this.twoSecondsTimeout);
        document.getElementById("gameField").childNodes.forEach((element) => {
            element.classList.add('openedItems');
        });
    };

    getFieldsContent = (count) => {
        let fields = [];

        for (let i = 1; i <= count; i++) {
            fields.push(i);
            fields.push(i);
        }

        //shuffle array
        fields.sort(() => Math.random() - 0.5);
        this.setState({fields});
    };

    getImagePath = (imageNumber) => {
        return "/img/" + imageNumber + ".jpg";
    };

    clickGameFields(e) {
        if (e.target.childElementCount > 1 || this.disabled === true) {
            return;
        }
        this.audioClick.play();

        let divImage = null;
        if (e.target instanceof HTMLImageElement) {
            divImage = e.target.parentElement;
        } else {
            divImage = e.target;
        }

        if (divImage.classList.contains('openedItems')) {
            return;
        }

        if (this.selectedCards.length === 2) {
            clearTimeout(this.timeout);
            this.clearSelectedCards();
        }

        divImage.classList.add('openedItems');

        if (this.selectedCards.length === 0) {
            this.selectedCards.push(divImage.firstElementChild);
        } else {
            this.selectedCards.push(divImage.firstElementChild);
            if (divImage.firstElementChild.src !== this.selectedCards[0].src) {
                this.timeout = setTimeout(() => {
                    this.clearSelectedCards();
                }, 2000);
            } else {
                this.selectedCards = [];
                this.countOpen++;
                this.sameCards.play();
                if (this.countOpen === this.props.countFields){
                    this.props.finishGame();
                }
            }
        }

        this.props.updatePropsClick();
    };

    clearSelectedCards() {
        this.selectedCards.forEach((element) => {
            element.parentElement.classList.remove('openedItems');
        });
        this.selectedCards = [];
    }

    render() {
        return (
            <div id='gameField' className='gameField' onClick={(e) => this.clickGameFields(e)}>
                {this.state.fields.map((i, key) => <div key={key} className='imagebox openedItems'><img  className='' src={this.getImagePath(i)}/></div>)}
            </div>
        )
    }
}

export default GameField;