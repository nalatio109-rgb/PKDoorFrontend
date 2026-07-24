const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else if (file.endsWith('.jsx')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('D:/PK-Door/frontend-pkdoor/src');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Using string replacements instead of regexes where possible to avoid issues
    content = content.replaceAll('to="/about"', 'to="/gioi-thieu"');
    content = content.replaceAll("to='/about'", "to='/gioi-thieu'");
    content = content.replaceAll("navigate('/about')", "navigate('/gioi-thieu')");
    
    content = content.replaceAll('to="/contact"', 'to="/lien-he"');
    content = content.replaceAll("to='/contact'", "to='/lien-he'");
    content = content.replaceAll("navigate('/contact')", "navigate('/lien-he')");
    
    content = content.replaceAll('to="/products/composite"', 'to="/san-pham/composite"');
    content = content.replaceAll("to='/products/composite'", "to='/san-pham/composite'");
    content = content.replaceAll("'/products/composite'", "'/san-pham/composite'");
    
    content = content.replaceAll('to="/products/pvc"', 'to="/san-pham/pvc"');
    content = content.replaceAll("to='/products/pvc'", "to='/san-pham/pvc'");
    content = content.replaceAll("'/products/pvc'", "'/san-pham/pvc'");
    
    content = content.replaceAll('to="/products/ghep-thanh"', 'to="/san-pham/ghep-thanh"');
    content = content.replaceAll("to='/products/ghep-thanh'", "to='/san-pham/ghep-thanh'");
    content = content.replaceAll("'/products/ghep-thanh'", "'/san-pham/ghep-thanh'");
    
    content = content.replaceAll('to="/products"', 'to="/san-pham"');
    content = content.replaceAll("to='/products'", "to='/san-pham'");
    content = content.replaceAll("navigate('/products')", "navigate('/san-pham')");
    
    content = content.replaceAll('to="/cart"', 'to="/gio-hang"');
    content = content.replaceAll("to='/cart'", "to='/gio-hang'");
    content = content.replaceAll("navigate('/cart')", "navigate('/gio-hang')");
    
    content = content.replaceAll('to="/admin"', 'to="/quan-tri"');
    content = content.replaceAll("to='/admin'", "to='/quan-tri'");
    content = content.replaceAll("navigate('/admin')", "navigate('/quan-tri')");
    
    content = content.replaceAll('`/product/', '`/san-pham-chi-tiet/');

    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
});
