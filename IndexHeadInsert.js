/** Client side script, referenced by file autoindex.conf.
  */
( function()
{

    /** Elevates any h1 element from the README file to its proper place.
      */
    function ensureProperTitling( head, body )
    {
        var e = body.firstElementChild;
        if( e == null ) return; // seems IE 9.0 parses too fast, ignoring *defer* attribute of script element

        if( e.localName != 'h1' ) return;

        var h1Default = e; // that of mod_autoindex
        var walker = document.createTreeWalker( body, NodeFilter.SHOW_ELEMENT, /*custom filter*/null );
        if( !walker ) return; // createTreeWalker is missing from early versions of IE 9

        var h1;
        var h1Count = 0; // including h1Default
        for( ;; )
        {
            e = walker.nextNode();
            if( !e ) break;

            if( e.localName != 'h1' ) continue;

            h1 = e;
            ++h1Count;
        }
        if( h1Count != 2 ) return;

        body.replaceChild( h1, h1Default );
        e = head.firstElementChild;
        if( e.localName != 'title' ) return;

        e.firstChild.data = h1.textContent;
    }

////////////////////

    ensureProperTitling( document.head, document.body );

}() );


// Copyright © 2017 Michael Allan and contributors.  Licence MIT.
