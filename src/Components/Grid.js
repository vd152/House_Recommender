import React from 'react';

class Grid extends React.Component {
    getIcon = (value) =>{
        if(value[0] == 'h'){
            return <React.Fragment>
                <i className="fas fa-home"></i>
                <span style={{fontSize: '20px'}}>{value[1]}</span>
            </React.Fragment>
        }else if(value == 'r'){
            return <i className="fas fa-utensils"></i>
        }else if(value == 'm'){
            return <i className="fas fa-shopping-cart"></i>
        }else if(value == 'p'){
            return <i className="fas fa-car"></i>
        }else if(value == 't'){
            return <i className="fas fa-coffee"></i>
        }else if(value == 'g'){
            return <i className="fas fa-dumbbell"></i>
        }
    }
    render(){
        const cellRowStyle = {
            display: 'flex',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        }
        const cellColumnStyle = {
            width: '50px',
            height: '40px',
            backgroundColor: '#ccf0cf',
            margin: '5px',
            padding: '5px',
            fontSize: '25px',
            color: '#006308'
        }
        return(
            <React.Fragment>
                {this.props.matrix.map((row,key)=>{
                    return (
                        <div style={cellRowStyle}>
                            {row.map((col,key)=>{
                                return <div style={cellColumnStyle}>{this.getIcon(col)}</div>
                            })}
                        </div>

                    )
                })}
            </React.Fragment>
        )
    }
}
export default Grid;