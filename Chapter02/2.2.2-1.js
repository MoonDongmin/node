const formData = new FormData();
formData.append('name', 'zerocho');
formData.append('item', 'orange');
formData.append('item', 'melon');
formData.has('item');
formData.has('money');
formData.get('item');
formData.getAll('item');
formData.append('test',['hi','zero']);
formData.get('test');
formData.delete('test');
formData.get('test');
formData.set('item','apple');
formData.getAll('item');
