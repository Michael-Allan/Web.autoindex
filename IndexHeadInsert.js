/** IndexHeadInsert.js - Presentation program for waycast directory documents
  *
  *   Summoned by each waycast directory document as configured in file `autoindex.conf`,
  *   this program runs on the client side — in the reader’s Web browser — where it manipulates
  *   the DOM of the directory.
  */
( function()
{

    /** Moves any *h1* element of a README document to its proper place.
      *
      *     @param head (Element)
      *     @param body (Element)
      */
    function ensureProperTitling( head, body )
    {
        var e = body.firstElementChild;
        if( e === null ) return; // IE 9.0 parses too fast, ignoring *defer* attribute of *script*

        if( e.localName !== 'h1' ) return;

        var h1Default = e; // The *h1* element generated by mod_autoindex
        var walker = document.createTreeWalker( body, NodeFilter.SHOW_ELEMENT, /*custom filter*/null );
        if( !walker ) return; // createTreeWalker is missing from early versions of IE 9

        var h1;
        var h1Count = 0; // Including *h1Default*
        for( ;; )
        {
            e = walker.nextNode();
            if( e === null ) break;

            if( e.localName !== 'h1' ) continue;

            h1 = e;
            ++h1Count;
        }
        if( h1Count !== 2 ) return;

        body.replaceChild( h1, h1Default ); // Replacing *h1Default* with README declared *h1*
        e = head.firstElementChild;
        if( e.localName !== 'title' ) return;

        e.firstChild.data = h1.textContent; // Retitling the document accordingly
    }

////////////////////

    ensureProperTitling( document.head, document.body );

}() );


// Copyright © 2017-2019 Michael Allan and contributors.  Licence MIT.
