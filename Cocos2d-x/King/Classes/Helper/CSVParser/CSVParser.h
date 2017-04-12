/*************************BEGIN****************************************************
Created by HAO on 2017/04/10
BRIEF	: CSV文件处理
VERSION	:
HISTORY	:
***************************END****************************************************/

//（1）命名空间	：CSVParser
//（2）Row类		：一行的数据记录。已重载[] 运算符，可以通过“键值对”方式获取数据值。
//（3）Csv类		：解析csv文件。已重载[] 运算符，可以像数组一样获取数据值。

#ifndef _CSVParser_H_
#define _CSVParser_H_

#include "cocos2d.h"
USING_NS_CC;

#include <vector>
#include <string>
using namespace  std;


namespace CSVParser
{

	// 每一行的记录
	class Row {
		public:
		Row() {}
		~Row() {}

		void push_back(const string& value) { m_values.push_back(value); }
		void setHeader(const vector<string>* header) { m_header = header; }

		public:

		// 每行数据有多少字段
		int size() const { return m_values.size(); }

		// 运算符 [] 重载
		string& operator[](int key) {
			if(key < size()) return m_values[key];
			throw "can't return this value (doesn't exist)";
		}

		// 运算符 [] 重载
		string& operator[](const string& key) {
			vector<string>::const_iterator it;
			int pos = 0;
			for(it = (*m_header).begin(); it!=(*m_header).end(); it++) {
				if(key==*it) return m_values[pos];
				pos++;
			}
			throw "can't return this value (doesn't exist)";
		}

		private:
		const vector<string>* m_header;
		vector<string> m_values;
	};


	class Csv {
		public:
		Csv(const string& filename);
		~Csv();

		// 解析csv文件
		void Parse(const string& filename);

		// 错误信息
		const string& getErrorInfo() const { return m_strErrorInfo; }

		// 获取列头字段
		vector<string> getHeader() const { return m_header; }
		// 获取总行数
		int getRowCount() const { return m_content.size(); }
		// 获取总列数
		int getColumnCount() const { return m_header.size(); }
		// 运算符 [] 重载
		Row& operator[](int key);

		private:
		// 读取整个文件的数据
		void Load(const string& filename, string& Data);
		void setHeader();

		private:
		// 原始表格数据
		vector<Row> m_content;   // 所有行的数据（包含列头）
		vector<string> m_header; // 列头字段
								 // 错误信息
		string m_strErrorInfo;
	};
}


#endif  // _CSVParser_H_




