const root = document.querySelector('#root')
let users = []
for (let i = 0; i < 20; i++){
    let randomCard = faker.helpers.createCard()
    users.push(randomCard)
    let num = Math.round(Math.random()) 
    if (num === 1) randomCard.isFavorite =  true
    else randomCard.isFavorite = false
}

let e = React.createElement
class bodyContainer extends React.Component{
    state = {
        users: users
    }
    createUser = (e) => {
        e.preventDefault()
        let randomCard = faker.helpers.createCard()
        randomCard.isFavorite = true
        this.state.users.unshift(randomCard)
        this.setState({users})
    }
    render(){
        const header = e('h1', null, 'Acme Faker Favorites')
        const { users } = this.state
        const numberFavorites = e('a', {href: '' , onClick: this.createUser, className: 'favoritelink'}, 
            `You have ${
            users.reduce((accum, elem) => {
                if (elem.isFavorite === true) accum ++

                return accum
            },0 )}
            favorite users!`)
        const htmlString = users.map((elem, idx) => {
            let name = e('div', null, elem.name)
            let userName = e('div', null, elem.username)
            return e('div', { className: `card ${elem.isFavorite ? 'favorite': ''}`, 
            onClick: (e) => {
                e.preventDefault()
                console.log(e.target)
                users.forEach(user => {
                    if (user.name == e.target.innerHTML || user.username == e.target.innerHTML) {
                        user.isFavorite = !user.isFavorite
                    }
                    this.setState({users})
                })
            }}, name, userName)
        })
        return e('div', null, header, numberFavorites, htmlString)
    }

ReactDOM.render(
    e(bodyContainer),
    root, 
    () => console.log('I have rendered')
)