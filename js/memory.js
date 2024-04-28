document.addEventListener("DOMContentLoaded", ready);

const images = [
    "images/image1.png",
    "images/image4.png",
    "images/image20.png",
    "images/image22.png",
    "images/image45.png",
    "images/image47.png",
    "images/image74.png",
    "images/image95.png"
];




function ready() {
    let board;

    const nodesBox = document.querySelectorAll( ".box" );
    
    /* nodesBox.forEach(( element, key ) => {
        element.addEventListener( "click", onClickBox );
    }); */

    board = setBoardMemory ( 16 );
    console.log( board );
    
    nodesBox.forEach( nodeBox => {
        nodeBox.addEventListener( "click", function (event) {
            onClickBox(board, event);
        });
    });
    

}

function getEmptyBoardPosition( iPositionsBoard, board ) {
    let x;
    
    do {
        x = getRandomIntNumber( 0, iPositionsBoard -1 );
    } while( typeof board[ x ] !== "undefined" )

    return x;
} 

function setBoardMemory( iPositionsBoard ) {
    let board= [];
    let iPositionBoardEmpty;
    for ( let i = 0; i <= (iPositionsBoard/2) - 1; i++ ) {
        iPositionBoardEmpty = getEmptyBoardPosition( iPositionsBoard, board );
        board[ iPositionBoardEmpty ] = i;

        iPositionBoardEmpty = getEmptyBoardPosition( iPositionsBoard, board );
        board[ iPositionBoardEmpty ] = i;
    }
    
    return board;
}

function onClickBox ( board, event ) {
    if( event.target.innerText === "" ) {
        console.log( board );
        let iBusyBoxes;
        const nodesBox = document.querySelectorAll( ".box" );
        
        nodesBox.forEach(( element, key ) => {
            //element.innerText = key;
            if ( event.target === element ) {
                //element.innerText = "Es";
                iNode = key;
            }
        });
        console.log ( iNode );
        
        console.log( images[ board[ iNode ] ] );
        /* <img src='images/image1.png' class="width100"> */
        console.log( `<img src='${images[ board[ iNode ] ]}' class="width100">` );
        
        //event.target.innerText = board[ iNode ];
        event.target.innerHTML = `<img src='${images[ board[ iNode ] ]}' class="width100">`;

        iBusyBoxes = getBusyBoxes();
        if ( iBusyBoxes % 2 === 0 ) {
            
            //console.log( "Tengo que comparar" );
            //console.log( "El problema el que comparo" );
            //isMatch();
            
            isMatch2( event.target );
        } else {
            console.log( "No tengo que comparar" );
            // classlist
            
            event.target.classList.add( "click" );
        }
    }

}

function isMatch2( node ) {
    const nodeClick = document.querySelector( ".click" );
    const nodeOverlay = document.querySelector( ".overlay" );

    nodeOverlay.classList.toggle( "hiddend" );

    if ( node.innerHTML === nodeClick.innerHTML ) {
        console.log( "Son iguales, los dejo" );
        nodeOverlay.classList.add( "hiddend" );
        nodeClick.classList.remove( "click" );

        nodeClick.classList.add( "found" );
        node.classList.add( "found" );

    } else {
        //console.log( "NO Son iguales, los borro" );
        setTimeout(() => {
            node.innerHTML = "";
            nodeClick.innerHTML = ""; 
            nodeClick.classList.remove( "click" );
            nodeOverlay.classList.toggle( "hiddend" );
        }, 1000);

    }
}

function isMatch() {
    const nodesBox = document.querySelectorAll( ".box" );
    const nodeOverlay = document.querySelector( ".overlay" ) ;
    nodesBox.forEach(nodeBox1 => {
        bDeleteText = true;
        nodesBox.forEach(nodeBox2 => {
            if ( nodeBox1 !== nodeBox2 ) {
                //if ( nodeBox1.innerText === nodeBox2.innerText ) {
                if ( nodeBox1.innerHTML === nodeBox2.innerHTML ) {
                    bDeleteText = false;
                }
            }
        });
        if ( bDeleteText ) {
            setTimeout(() => {
                //nodeBox1.innerText = "";
                nodeBox1.innerHTML = "";
                nodeOverlay.classList.add( "hiddend" );
            }, 1000);
        } else {
            setTimeout(() => {
                nodeOverlay.classList.add( "hiddend" );
            }, 1000);
        }
    });
}

function getBusyBoxes() {
    const nodesBox = document.querySelectorAll( ".box" );
    let iBusyBoxes = 0;
    nodesBox.forEach(( nodeBox, key ) => {
        //if ( nodeBox.innerText !== "" ) {
        if ( nodeBox.innerHTML !== "" ) {
            iBusyBoxes++;
        }
    });
    console.log( iBusyBoxes );
    return iBusyBoxes;
}