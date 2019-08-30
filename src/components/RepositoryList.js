import React,{Component} from 'react';
import { Spin,Button } from 'antd';
import axios from 'axios';
import moment from "moment";
import RepositoryItem from 'components/RepositoryItem';

const API_URL = 'https://api.github.com';
const per_page= 100;

class RepositoryList extends Component {
    
    state = {
        repositories: [],
        last:null,
        current_page: 1
      }

    getRepositories =  (pageNumber,per_page) => {

          let date = moment().subtract(30, "days").format("YYYY-MM-DD");
          const url = `${API_URL}/search/repositories?q=created:>${date}&sort=stars&order=desc&page=${pageNumber}&per_page=${per_page}`;
       
         axios.get(url).then((response) => {

            this.setState({ repositories: response.data.items})
            let linkHeader = response.headers.link;
            let parse = require('parse-link-header');        
            let parsed = parse(linkHeader);
      
            this.setState({ current_page: pageNumber})
            this.setState({ last: parsed.last.page})
          
        })
    }
    componentDidMount() {
         this.getRepositories(this.state.current_page,per_page);
    }
    render(){
       
        let renderPageNumbers="";
        const pageNumbers = [];
        if (this.state.last !== null) {
            for (let i = 1; i <= this.state.last; i++) {
              pageNumbers.push(i);
            }
            renderPageNumbers = pageNumbers.map(number => {
        
                if (number === 1 || number === this.state.last || (number >= this.state.current_page - 2 && number <= this.state.current_page + 2)) 
                    return (
                      <Button className="gr-pagination__number"  key={number} onClick={() => this.getRepositories(number,per_page)}>{number}   </Button>
                    );
                  
              });

            }
      
        return (
            <div className="gr-list">
               {this.state.repositories.length===0 &&  
               <div> <Spin size="large" className="gr-spin" /> 
               <div className="gr-loading"> The most starred Github repos that were created in the last 30 days </div> </div> }
                {this.state.repositories.map(repo =>

                <RepositoryItem 
                  key={repo.id} 
                  name={repo.name} 
                  avatar={repo.owner.avatar_url} 
                  description={repo.description} 
                  stars={repo.stargazers_count} 
                  issues={repo.open_issues_count}
                  ownerLogin={repo.owner.login}
                  ownerUrl={repo.owner.html_url}
                  createdAt= {repo.created_at}
                 />
                 )}
                {this.state.repositories.length!==0 && 
                <div className="gr-pagination">
                    {renderPageNumbers}
                </div> }
            </div>
           
        )
    }
    
}
export default RepositoryList;