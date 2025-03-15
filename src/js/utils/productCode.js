class ProductCodeGenerator {
    // Format: SOURCE-TYPE-BATCH-NUMBER
    // Example: HN-SH-001-0001 (Hanoi-Shoes-Batch001-Item0001)
    
    static sources = {
        'Hanoi': 'HN',
        'HoChiMinh': 'HCM', 
        'DaNang': 'DN',
        'Import': 'IMP',
        'Export': 'EXP'
    };

    static types = {
        'Shoes': 'SH',
        'Clothing': 'CL', 
        'Electronics': 'EL',
        'Accessories': 'AC',
        'Food': 'FD',
        'Cosmetics': 'CS'
    };

    static generateCode(source, type, batchNumber, itemNumber) {
        const sourceCode = this.sources[source] || 'XXX';
        const typeCode = this.types[type] || 'XX';
        const batchCode = batchNumber.toString().padStart(3, '0');
        const itemCode = itemNumber.toString().padStart(4, '0');

        return `${sourceCode}-${typeCode}-${batchCode}-${itemCode}`;
    }

    static parseCode(code) {
        const [sourceCode, typeCode, batchCode, itemCode] = code.split('-');
        return {
            source: Object.keys(this.sources).find(key => this.sources[key] === sourceCode) || 'Unknown',
            type: Object.keys(this.types).find(key => this.types[key] === typeCode) || 'Unknown',
            batchNumber: parseInt(batchCode),
            itemNumber: parseInt(itemCode)
        };
    }
}
