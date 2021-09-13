import React, { Component } from 'react'
import {Hero,Ctasection,Services,Portfolio,Client} from './components/export'

class Home extends Component{
    render(){
        return (
            <div>
                <section id="hero">
                    <Hero/>
                </section>

                <section id="cta" className="cta">
                    <Ctasection/>
                </section>
                
                <section id="services" className="services">
                    <Services/>
                </section>

                <section id="portfolio" className="portfolio">
                    <Portfolio/>
                </section>

                <section id="clients" className="clients">
                    <Client/>
                </section>
            </div>
        )
    }
}

export default Home