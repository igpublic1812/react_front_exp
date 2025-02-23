Converted CRUD(used sprongboot) & UI app with spring boot backend to a demo app only react and deploy to https://www.netlify.com/ "# react_front_exp" 
Modified app to use array managment on clint  
1. main example covered examples passing  of use array in diff pages:this.props.history.push({ pathname: '/page', state: data // your data array of objects })
2. Render() { const { state } = this.props.location return ( // render logic here ) }
3. Compare two approach use ListBuildingComponentOld extends Component and ListBuildingComponent using const ..  as regular component
4. Use validation framework for email.
5. Confirm delete custom component
6. Typeahead component for zip code
App deploy https://www.netlify.com/ git https://github.com/igpublic1812/react_front_exp/tree/main
