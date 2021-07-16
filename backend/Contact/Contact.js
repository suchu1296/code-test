const fs = require('fs');

class Contact {
    constructor(filename = 'contact.json') {
        this.path = `./data/${filename}`;
    
        try {
          fs.readdirSync('data');
        } catch (error) {
          fs.mkdirSync('data');
        }
    
        try {
          fs.accessSync(this.path);
        } catch (error) {
          fs.writeFileSync(this.path, '[]');
        }
      }

    createId() {
        return new Date().getTime().toString();
      }

      async create(data, id, imageName) {
        const totalData = await this.getAll();
        //const { content } = data;
        //const desc = content.substr(0, 100) + '...';
        totalData.push({
          ...data,
          id,
          
          thumbnail: `http://localhost/${imageName}`,
        });
    
        await fs.promises.writeFile(this.path, JSON.stringify(totalData, null, 2));
      }

      async update(data, id) {
        const totalData = await this.getSingle();
        //const { content } = data;
        //const desc = content.substr(0, 100) + '...';
        totalData.push({
          ...data,
          id
          
          
        });
    
        await fs.promises.writeFile(this.path, JSON.stringify(totalData, null, 2));
      }

      async getAll()
      {
        return JSON.parse(await fs.promises.readFile(this.path));
      }

      async getSingle(id) {
        const data = await JSON.parse(await fs.promises.readFile(this.path));
        return data.find(contact => contact.id === id);
      }

       
} 

module.exports = Contact;