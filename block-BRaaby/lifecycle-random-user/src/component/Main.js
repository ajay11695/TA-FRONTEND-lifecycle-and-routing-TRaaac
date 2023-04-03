import React from "react";

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            reset: false,
            currentuser: null,
            active: false,
            activebtnName: 'name',
            user: {
                name: '',
                email: '',
                age: '',
                location: '',
                phone: '',
                password: '',
                image: ''
            }
        }
    }

    componentDidMount() {
        fetch('https://randomuser.me/api')
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                let { name, email, dob, location, phone, login, picture } = data.results[0]
                this.setState({
                    currentuser: data.results[0],
                    user: {
                        name: name.first + ' ' + name.last,
                        email: email,
                        age: dob.age,
                        location: location.city,
                        phone: phone,
                        password: login.password,
                        image: picture.large
                    }
                })
            })
    }

    handleClick = (btnName) => {
        this.setState({
            activebtnName: btnName,
            active: true
        })
    }

    handlebtn = () => {
        this.setState({ reset: true })
        fetch('https://randomuser.me/api')
            .then(res => res.json())
            .then(data => {
                let { name, email, dob, location, phone, login, picture } = data.results[0]
                this.setState({
                    reset: false,
                    currentuser: data.results[0],
                    user: {
                        name: name.first + ' ' + name.last,
                        email: email,
                        age: dob.age,
                        location: location.city,
                        phone: phone,
                        password: login.password,
                        image: picture.large
                    }
                })
            })
    }

    render() {
        let { user, activebtnName, currentuser, active, reset } = this.state
        if (!this.state.currentuser) {
            return (
                <div className="load">
                    <svg
                        className="loader"
                        xmlns="http://www.w3.org/2000/svg"
                        width='24'
                        height='24'
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="10" />
                    </svg>
                </div>
            );
        }
        return (
            <center>
                <section className="section-1"></section>
                <section className="container">
                    <div className="upper"></div>
                    <div>
                        <hr />
                        <figure>
                            <img src={this.state.currentuser ? this.state.user.image : ''} alt="" />
                        </figure>
                        <p>{`My ${activebtnName} is`}</p>
                        <h1>{activebtnName && currentuser ? user[activebtnName] : ''}</h1>
                        <div className="icon">
                            <i onClick={() => { this.handleClick('name') }} className={active && activebtnName === 'name' ? 'fas fa-user active' : 'fas fa-user'}></i>
                            <i onClick={() => { this.handleClick('email') }} className={active && activebtnName === 'email' ? 'fas fa-envelope-open active' : 'fas fa-envelope-open'}></i>
                            <i onClick={() => { this.handleClick('age') }} className={active && activebtnName === 'age' ? 'fas fa-calendar active' : 'fas fa-calendar'}></i>
                            <i onClick={() => { this.handleClick('location') }} className={active && activebtnName === 'location' ? 'fas fa-map active' : 'fas fa-map'}></i>
                            <i onClick={() => { this.handleClick('phone') }} className={active && activebtnName === 'phone' ? 'fas fa-phone-square active' : 'fas fa-phone-square'}></i>
                            <i onClick={() => { this.handleClick('password') }} className={active && activebtnName === 'password' ? 'fas fa-lock active' : 'fas fa-lock'}></i>
                        </div>
                        <button onClick={this.handlebtn} className={reset ? 'btn btn1' : 'btn'}>{reset ? 'Loding...' : 'random user'}</button>
                    </div>
                </section>
            </center>
        )
    }

}

export default Main

